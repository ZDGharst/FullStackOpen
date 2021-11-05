# Part 9 - TypeScript

## Background

TypeScript is a programming language designed for large-scale JavaScript development created by Microsoft. To support building large-scale JavaScript applications, TypeScript offers feeatures such as better development-time tooling, static code analysis, compile-time type checking and code level documentation.

TypeScript is a typed supeerset of JavaScript, and it's eventually compiled into plain JavaScript. The programmer can pick the version of the generated code from ECMAScript 3 and newer.

TypeScript has three separate but mutually fulfilling parts:

- the language: syntax, keywords, type annotations
- the compiler: type information erasure, code transformations.
- the language service: collects type information, intellisense, type hints, refactoring.

## Type annotations

Type annotations are a lightweight way to record the intended *contract* of a function or variable. The function beleow accepts two arguments, one of type string and one of type number. The function will return a string.

```ts
const birthdayGreeter = (name: string, age: number): string => {
  return `Happy birthday ${name}, you are now ${age} years old!`;
};
```

## Structural typing

TypeScript is a structually typed language, which means that two elements are considered to be compatible with one another if for each feature within the type of the first, a corresponding and idential feature exists within the second. Two types are considered to be identical if they are compatible with each other.

## Type inference

If no type is specified, the TypeScript compiler can attempt to infer the type information when initializing variables, setting parameter values, and determining function return types.

## Why Use TypeScript?

It offers type checking and static code analysis; values are required to be of a certain type, and the compiler can warn about using them wrong. Static code analysis allows for mistakes to be caught early in the process, and IDEs can have full features that are only afforded to typed languages. Type annotations act as code level documentation which is always up to date.

## A complicated example

```ts
type CallsFunction = (callback: (result: string) => any) => void;

const func: CallsFunction = (cb) => {
  cb('done');
  cb(1);
}

func((result) => {
  return result;
});
```

This example declares a type alias called `CallsFunction` which is a function type that returns void with one parameter `callback`. The `callback` parameter is of type funciton which takes a `string` parameter and returns `any` value. The `func` function is of type `CallsFunction`, `cb(1)` will result in an error.

## Getting started

You can install TypeScript via `npm install typescript`. ts-node is helpful to run TypeScript in a Node style, but you can always compile TypeScript code then run it using Node. My preferred method is:

- Use `w` flag to watch for changes and TypeScript will auto-compile them.
- Use `nodemon` to watch for changes in the destination/build folder and auto-run them.

## Creating your own types

A type can be created by describing what types of inputs are accepted.

```ts
type Operation = 'multiply' | 'add' | 'divide';

type Result = number;

const calculator = (a: number, b: number, op : Operation) : Result => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if( b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
}

try {
  console.log(calculator(1, 5 , 'divide'))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
```

## tsconfig

The tsconfig.json file contains all your core configurations on how you want TypeScript to work in your project. You can define how strictly you want the code to be inspected, what files to include and exclude (node_modules is excluded by default), and where compiled files should be placed.

## Interfaces

Interfacees can be created which define objects.

```ts
export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}
```

## Utility types

There are many utility types that allow a specific modification of a type. For instance, `Pick` will only pick certain fields out of a type. `Omit` can, obviously, omit fields in a type.

## React with TypeScript

TypeScript can help us catch the following errors in React:

- trying to pass an extra/unwanted prop
- forgetting to pass a required prop
- passing a prop of a wrong type

`create-react-app` can be used to create a React app with TypeScript like so: `npx create-react-app my-app --template typescript`. After this, configure the linter, tsconfig, add scripts (`tsc -w`, `nodemon`, etc.), and more.
