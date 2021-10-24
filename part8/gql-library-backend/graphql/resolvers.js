const { UserInputError } = require('apollo-server-core')
const mongoose = require('mongoose')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('../models/Author')
const Book = require('../models/Book')

const resolvers = {
  Author: {
    bookCount: (root) => root.books.length
  },

  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.genre) filter['genres'] = args.genre
      return await Book.find(filter).populate('author')
    },
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if(!context.currentUser) {
        throw new AuthenticationError("Not authenticated.")
      }

      const book = new Book({ ...args })

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author, born: null })
      }

      book.author = author
      author.books = author.books.concat(book)

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },

    editAuthor: async (root, args, context) => {
      if(!context.currentUser) {
        throw new AuthenticationError("Not authenticated.")
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) {
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
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, config.SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

module.exports = resolvers
