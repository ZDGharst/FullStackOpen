# Part 2 - Rendering a collection, modules

## Visual Studio Code snippets

File > Preferences > Code Snippets

Define your own code snippets using [these instructions](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_creating-your-own-snippets).

## JavaScript Arrays

JavaScript supports functional programming methods `find`, `filter`, and `map`. It may be good to review [Functional Programming in JavaScript](https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84).

## Rendering Collections

Suppose you have an array of notes. While you could render each one individually, you may want to render them flexing on the size of the array. It's also possible to use a `for` loop based on the data; however, let's use something more idiomatic to React: functional programming.

```js
<ul>
  <li>{notes[0].content}</li>
  <li>{notes[1].content}</li>
  <li>{notes[2].content}</li>
</ul>
```

This is most likely not very good. Static amount, unsafe, etc.

```js
{for (let i = 0; i < notes.length; i++>) {
  <li>{notes[i].content}</li>
}}
```

This could be okay, but a for loop based on the size of a collection is an old style of programming that shouldn't exist today. The size of the array may change while we're running the for loop (side effects), so we have to check the size of the array every single time which isn't great for performance. 

```js
{notes.forEach(note => <li>{note.content}</li>)}
```

This is even better still. `forEach` is almost always preferred. However, let's avoid just running a function and instead returning a new array based on the old one.

```js
{notes.map(note => <li>{note.content}</li>)}
```

This is definitely the best way. We've created a new array that has values we want to *map* to from our old array. We can also reuse this mapped array for many different tasks unlike the forEach method.

## Key-attribute

Every element in a list item should have a unique key to help React render efficiently. Let's replace the previous mapping with a new one.

```js
{notes.map(note => <li key={note.id}>{note.content}</li>)}
```

**Do not** use array indices as keys. This is an anti-pattern.

## Filtering Elements

```js
{notes.filter(note => note.important === true)}

// or

{notes.filter(note => note.important)}
```

## JSON Server

[Json Server](https://github.com/typicode/json-server) is a useful tool to quickly mock a backend for frontend development. It creates a REST API from a json file. 

```
$ npm install json-server --save-dev

// package.json:
  "scripts": {
    ...
    "server": "json-server -p3001 --watch db.json"
    ...
  }
```

## Axios

Axios is a library that makes it easy to work with promises. A Promise is an object representing eventual competlion or failure of an async operation. Possible status: pending, fulfilled, rejected.

```js
import axios from 'axios'

axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  console.log(notes)
})
```

## Effect Hooks

Effect hooks let you perform side effects in function components. This is the best way to retrieve data and re-render the component.

```js
useEffect(() => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
    console.log('promise fulfilled')
    setNotes(response.data)
  })
}, [])
```

The effect hook is ran after the component has been rendered. The second parameter states how often effect is run; an empty array means only the first render. 