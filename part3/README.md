# Part 3 - Programming a server with NodeJS and Express

## Simple web server

It's possible to create a simple web server by using the http module.

```js
const http = require('http')

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

## Express

Using the Express module allows for a more pleasing experience.

```js
const express = require('express')
const app = express()

let notes = []

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

## nodemon

nodemon allows for the program to restart automatically when it detects changes in the file system. It should be installed as a dev dependency.

## REST

REST is an architectural style meant for building scalable web applications.

| URL      | verb   | functionality                                                    |
|----------|--------|------------------------------------------------------------------|
| notes/10 | GET    | fetches a single resource                                        |
| notes    | GET    | fetches all resources in the collection                          |
| notes    | POST   | creates a new resource based on the request data                 |
| notes/10 | DELETE | removes the identified resource                                  |
| notes/10 | PUT    | replaces the entire identified resource with the request data    |
| notes/10 | PATCH  | replaces a part of the identified resource with the request data |

## Fetching, deleting, posting

Create a route and use a parameter to identify the resource.

```js
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  
  if (note) {
    response.json(note) 
  } else {
    response.status(404).end()
  }
})
```

Delete a resource in a similar manner:

```js
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})
```

Posting a new resource:

```js
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})
```

## VSCode Rest Client

I much prefer the VSCode Rest Client to Postman. Create rest files and press send to request.

```js
POST http://localhost:3001/api/persons/
Content-Type: application/json

{
  "name": "Lindsay", "number": "451379"
}
```

## Deploying application to the internet using Heroku

Add a Procfile to the root of the repo with `web: npm start`. Add `const PORT = process.env.PORT || 3001` rather than static port. Make sure the repo is a git repo with things properly git ignored. Initialize it as a Heroku repo with `heroku create`. Push to Heroku with `git push heroku master`.

## Build fullstack app

After running `npm run build`, move the build folder to the backend folder and serve it as a static file with `app.use(express.static('build'))`. Some handy npm scripts to streamline the process:

```json
{
  "scripts": {
    // ...
    "build:ui": "rm -rf build && cd ../part2-notes/ && npm run build --prod && cp -r build ../notes-backend",
    "deploy": "git push heroku master",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push && npm run deploy",    
    "logs:prod": "heroku logs --tail"
  }
}
```

You may need to add a proxy to the frontend React project for handling pathing now. Within package.json: `"proxy": "http://localhost:3001"`.

## MongoDB

MongoDB is a document database which falls under the NoSQL term. Install of installing MongoDB locally, you can use MongoDB Atlas to create clusters (and thus databases). MongoDB Atlas gives you the option of using AWS, Google Cloud, or Azure for provider. Remember to create a new user, give it access to the database, and only allow certain IP addresses. Once you've done this, you'll have a connection string.

Mongoose is a friendly library that provides a pleasing interface when working with MongoDB. 

Example connection and usage:

```js
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
```

## Fetching objects with Mongoose

Fetching all objects:

```js
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
```

Filtering:

```js
Note.find({ important: true }).then(result => {
  // ...
})
```

Error handling:

```js
app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})
```

## Adding constraints to schema

```js
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  date: {
    type: Date,
    required: true
    },
  important: Boolean
})
```

## Using dotenv

Installing dotenv allows you to hold environment variables in a .env file, such as MONGODB_URI or PORT.
