import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

// const result = useQuery({
//   queryKey: ["login", credentials],
//   queryFn: () => axios.post(baseUrl, credentials),
// });
// console.log(JSON.parse(JSON.stringify(result)));

// const login = result.data;

export default { login };
