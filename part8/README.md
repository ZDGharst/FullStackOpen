# Part 8 - GraphQL

## GraphQL vs REST

The resource basedness of REST works well most of the time, but it doesn't work well when many queries, nested queries, or recursive queries are needed. Sometimes multiple HTTP requests have to be made with REST which could be a single GraphQL query. Instead, a REST endpoint could be created for this job. But imagine there were a lot of different queries needed.

The main principle of GraphQL is that the frontend describes the data it wants, and queries the bakend for that data. All queries are sent to the same address. It is possible to query more than one query at a time.

```graphql
query FetchBlogsQuery {
  user(username: "mluukkai") {
    followedUsers {
      blogs {
        comments {
          user {
            blogs {
              title
            }
          }
        }
      }
    }
  }
}
```

## Schemas and queries

The schema describes the types used by GraphQL: object types, queries, mutations, and subscriptions. GraphQL only describes the queries, not how the data is stored (database, flat file, in memory, etc.). 

## Apollo Server

Apollo is the leading GraphQL server. An Apollo server takes at least two arguments: the type definitions (schema) and the resolvers. They describe how the queries are responded to.

```js
const { ApolloServer, gql } = require('apollo-server')

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

const typeDefs = gql`
  type Person {
    name: String!
    phone: String
    street: String!
    city: String! 
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
```

If a resolver doesn't exist, it's implicitly defined matching property names with a default resolver.

## Object within an object

It's possible to set a field type to another type within GraphQL.

```js
type Address {
  street: String!
  city: String! 
}

type Person {
  name: String!
  phone: String
  address: Address!
  id: ID!
}

const resolvers = {
//
  Person: {
    address: (root) => {
      return { 
        street: root.street,
        city: root.city
      }
    }
  }
}
```

## Mutations

Mutations are operations that cause a change. The schema is very similar to queries.

```js
type Mutation {
  addPerson(
    name: String!
    phone: String
    street: String!
    city: String!
  ): Person
}


const resolvers = {
  // ...
  Mutation: {
    addPerson: (root, args) => {
      const person = { ...args, id: uuid() }
      persons = persons.concat(person)
      return person
    }
  }
}
```

The resolver also returns the data that was changed, which is a common trend.

## Error Handling

When a logical rule is broken, throw an error.

```js
const resolvers = {
  // ..
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find(p => p.name === args.name)) {        throw new UserInputError('Name must be unique', {          invalidArgs: args.name,        })      }
      const person = { ...args, id: uuid() }
      persons = persons.concat(person)
      return person
    }
  }
}
```

## Enums

Enums can be used like so:


```js
enum YesNo {
  YES
  NO
}

type Query {
  personCount: Int!
  allPersons(phone: YesNo): [Person!]!  findPerson(name: String!): Person
}

Query: {
  personCount: () => persons.length,
  allPersons: (root, args) => {    if (!args.phone) {      return persons    }    const byPhone = (person) =>      args.phone === 'YES' ? person.phone : !person.phone    return persons.filter(byPhone)  },  findPerson: (root, args) =>
    persons.find(p => p.name === args.name)
},
```

## Apollo client

Apollo has a frontend client in JavaScript. Install it with `npm install @apollo/client graphql` in the frontend. A boiler plate application with GraphQL using Apollo could look like this:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
})

const query = gql`
query {
  allPersons  {
    name,
    phone,
    address {
      street,
      city
    }
    id
  }
}
`

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })

ReactDOM.render(<App />, document.getElementById('root'))
```

Apollo client has a cache to keep the number of requests low as possible. The cache can be dumped, updated, etc.

## useQuery hook

The `useQuery` hook contains a result object that holds the data and status about the result.

```js

const App = () => {
  const result = useQuery(ALL_PERSONS)

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      {result.data.allPersons.map(p => p.name).join(', ')}
    </div>
  )
}

// constantly poll a query every 2 seconds
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000  })

// a mutation can cause a query to be refetched
  const [ createPerson ] = useMutation(CREATE_PERSON, {
    refetchQueries: [ { query: ALL_PERSONS } ]  })
```

There's `useLazyQuery` as well for delaying queries that might need to wait for some parameter.

## Adding a token to a GraphQL header

The Apollo client requires an authLink to be concatonated to an httpLink.

```js
import { setContext } from '@apollo/client/link/context'
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('phonenumbers-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})
```

## Fragments

It's common in GraphQL that multiple queries return the same or similar results. Fragments can be used to avoid code reuse.

```js
fragment PersonDetails on Person {
  name
  phone 
  address {
    street 
    city
  }
}

query {
  allPersons {
    ...PersonDetails  }
}

query {
  findPerson(name: "Pekka Mikkola") {
    ...PersonDetails  }
}
```

## Subscriptions

A socket can be opened between a client and a server, and subscriptions can be created that alert the client when a change is made to the data. The implementations of subscriptions won't be noted here, because they have recently changed and are very server dependant.
