# Part 4 - Testing Express servers, user administration

## Project structure

By modularizing our program as much as possible, we can test properly. Node.js best practices dictates a project structure like this:

```txt
├── index.js
├── app.js
├── build
│   └── ...
├── controllers
│   └── notes.js
├── models
│   └── note.js
├── package-lock.json
├── package.json
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js
```

## Modularizing program

As an example: instead of doing `console.log()` directly, it's a better idea to create a utility module called logger. Calling logger.info() could print anywhere you want, and you only need to change it in the `info` function rather than everywhere in your program entirely.

```js
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info, error
}
```

In this case, you could output the info to the console, to a database, a text file, etc. You could also change the color (such as red for errors), pass in extra parameters, or do logic here on the info/errors such as not outputting info and errors if you're running in the test environment. You would only need to change this here rather than everywhere if `console.log()` is used.

## Automated testing

Jest is a testing library developed by Facebook, which resembles a previous JavaScript testing library called Mocha. Jest works incredibly well for backends and React applications. 

Getting started with Jest is easy.

```js
npm install --save-dev jest
jest --verbose

// package.json
"jest": {
  "testEnvironment": "node"
}

// average.test.js
describe('average', () => {
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})
```

mongo-mock is a good mocking library for MongoDB. supertest is helpful to test Express applications. Because the Node backend is properly modularized, it's easier to mock and test.

## Environments

By convention, in Node, the environment variable NODE_ENV is set to production, development, or test. You can then use the environment variable to change database strings, logging, etc.

```js
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI 
  : process.env.MONGODB_URI
```

## Initializing test database

Initialize the database with `beforeEach()` by deleting all collections, then initializing the collection again based on an initial array. Use `afterAll()` to close the connection.

## async/await

Rather than chaining using `then`, it's easier to use async and await keywords to write code that looks synchronous.

```js
const main = async () => {  const notes = await Note.find({})
  console.log('operation returned the following notes', notes)

  const response = await notes[0].remove()
  console.log('the first note is removed')
}
```

Using async/await requires try blocks instead of `catch()`. Using express-async-errors library allows for error handlers rather than try/catch in every async method.

## References across collections using NoSQL

If we were using a relational database the note would contain a reference key to the user who created it. In document databases we can do the same thing. 

```js
// a note references a user
{
  content: 'HTML is easy',
  important: false,
  _id: 221212,
  user: 123456,
}

// a user references their notes
{
  username: 'hellas',
  _id: 141414,
  notes: [221244],
}

// place the notes content directly in the users
{
  username: 'mluukkai',
  _id: 123456,
  notes: [
    {
      content: 'HTML is easy',
      important: false,
    },
    {
      content: 'The most important operations of HTTP protocol are GET and POST',
      important: true,
    },
  ],
}
```

In stark contrast to convention of relational databases, references are now stored in both documents.

## User administration

Use `bcrypt` to hash passwords. Use `jwt` to create tokens.

```js
// on creation
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

// on login
loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, 60*60*24)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

// verifying token
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const token = getTokenFrom(request)
const decodedToken = jwt.verify(token, process.env.SECRET)
if (!token || !decodedToken.id) {
  return response.status(401).json({ error: 'token missing or invalid' })
}
const user = await User.findById(decodedToken.id)
```

