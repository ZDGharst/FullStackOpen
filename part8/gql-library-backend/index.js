const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const config = require('./utils/config')

const Author = require('./models/Author')
const Book = require('./models/Book')
const { args } = require('commander')

console.log('Connecting to MongoDB...')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
  console.log('Connected to MongoDB.')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB: ', error.meessage)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => Book.collection.countDocuments({ author: mongoose.Types.ObjectId(root.id) })
  },

  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}
      if(args.genre) filter['genres'] = args.genre
      return await Book.find(filter).populate('author')
    },
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => await Author.find({})
  },

  Mutation:  {
    addBook: async (root, args) => {
      const book = new Book({ ...args })

      let author = await Author.findOne({ name: args.author })
      if(!author) {
        author = new Author({ name: args.author, born: null })

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, { 
            invalidArgs: args,
          })
        }
      }

      book.author = author

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, { 
          invalidArgs: args,
        })
      }

      return book
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if(!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { 
          invalidArgs: args,
        })
      }

      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})