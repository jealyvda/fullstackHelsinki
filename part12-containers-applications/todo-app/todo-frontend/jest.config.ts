module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./setupTests.ts'],
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  };