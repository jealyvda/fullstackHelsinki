const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')

const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl).then(() => {
  console.log('Connected to MongoDB')
}).catch((error) => {
  console.error('Error connection to MongoDB:', error.message)
})

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/**
 * type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Query {
  // ..
  me: User
}

type Mutation {
  // ...
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
 */



const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    genres: [String!]!
  }

  type Author {
    name: String,
    born: Int,
    bookCount: Int
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!,
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: String!,
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {};

      if (args.author) {
        query.author.name = args.author
      }

      if (args.genre) {
        query.genres = { $in: [args.genre] }
    }

      return Book.find(query);
    },
    allAuthors: async () => Author.find(),
    me: async (root, args) => {
      return User.findOne({ username: args.username })
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if ('req' in context && 'headers' in context.req) {
        const { headers } = context.req;

        if (headers.Authorisation && await Token.findOne({ value: headers.Authorisation })) {
        let author = await Author.findOne({ name: args.author })

        if (!author) {
          if (args.author.length < 4) {
            throw new GraphQLError('Invalid argument value, author name should have length >= 4', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            });
          }
          const newAuthor = new Author({ name: args.author })
          author = await newAuthor.save()
        }

        if (args.title.length < 5) {
          throw new GraphQLError('Invalid argument value, book name should have length >= 5', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          });
        }

        const newBook = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id
        })

        return newBook.save();
        }
      }

      throw new GraphQLError('Invalid argument value, no auth token, or token does not exist', {
        extensions: {
          code: 'BAD_AUTHORISATION',
        }
      });
    },
    editAuthor: async (root, args, context) => {
      if ('req' in context && 'headers' in context.req) {
        const { headers } = context.req;

        if (headers.Authorisation && await Token.findOne({ value: headers.Authorisation })) {
          return Author.findOneAndUpdate(
            { name: authorName },
            { $set: { born: args.setBornTo } },
            { new: true }
          )
        }
      }

      throw new GraphQLError('Invalid argument value, no auth token, or token does not exist', {
        extensions: {
          code: 'BAD_AUTHORISATION',
        }
      });
    },
    createUser: async (root, args) => {
      if (args.username.length < 5) {
        throw new GraphQLError('Invalid argument value, username should have length >= 5', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        });
      }
  
      const newUser = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      });
  
      return newUser.save();
    },
    login: async (root, args) => {
      if (args.username.length < 5) {
        throw new GraphQLError('Invalid argument value, username should have length >= 5', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        });
      }
  
      const user = await User.findOne({username: args.username });
      
      if (!user) {
        throw new GraphQLError('Invalid argument value, user does not exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        });
      }
  
      const newToken = new Token({ value: uuid() })
  
      return newToken.save()
    }
  },
  Author: {
    bookCount: async (root, args) => {
      const author = await Author.findOne({ name: root.name })
      const booksPerAuthor = await Book.find({ author: author._id });
  
      return booksPerAuthor.length;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
