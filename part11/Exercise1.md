# Exercise 11.1

Go has a few intrinsic features built into the standard library that lend itself very well to CI/CD.

- Linting: Go comes with `go fmt`, which is a tool that automatically formats Go source code. This isn't quite linting, as it formats the source code instead of giving errors or warnings, but Go's philosophy is that it prefers to use the standard library over external libraries.
- Testing: Go comes with a testing library used with `go test`.
- Building: Go has its own `go build` for building to various platforms.

Some other alternatives to Jenkins are Concourse CI and Drone. Alternatives to GitHub actions are Azure Pipelines and CircleCI.

For a team of six people using Go, it may be a great idea to use a cloud-based environment CI/CD environment. That isn't a very large team, so all the time spent on setup may not be worth the effort.