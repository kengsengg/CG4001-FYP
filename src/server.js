const { ApolloServer, gql } = require("apollo-server-express");
const { createWriteStream } = require("fs");
const path = require("path");
const express = require("express");
const { Storage } = require("@google-cloud/storage");

/*
 * Code reused from Ben Awad
 * (Source: https://github.com/benawad/apollo-server-react-file-upload/blob/1_gc/server/src/index.js retrieved in February 2019)
*/

const files = [];

const typeDefs = gql`
  type Query {
    files: [String]
  }
  type Mutation {
    uploadFile(file: Upload!): Boolean
  }
`;

const gc = new Storage({
  keyFilename: path.join(__dirname, "../dogwood-reef-271208-ec60ebee8c24.json"),
  projectId: "dogwood-reef-271208"
});

const recordsBucket = gc.bucket('cg4001-ethereum-healthcare-records');

const resolvers = {
  Query: {
    files: () => files
  },
  Mutation: {
    uploadFile: async (_, { file }) => {
      const { createReadStream, filename } = await file;

      await new Promise(res =>
        createReadStream()
          .pipe(recordsBucket.file(filename).createWriteStream({
            resumable: false,
            gzip: true
          }))
          .on("finish", res)
      );

      files.push(filename);
      
      return true;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
app.use("/files", express.static(path.join(__dirname, "./files")));
server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log(`Server ready at http://localhost:4000/`);
});