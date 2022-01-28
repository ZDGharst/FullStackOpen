# Part 12 - Introduction to Containers

Containers encapsulate your application into a single package. This package includes all of the dependencies with the application; each container can run isolated from the other containers. Containers prevent the application inside from accessing files and resources of the device. Containers are OS-level virtualization; they are relatively lightweight and can be quick to scale. They can be ran identically almost anywhere.

## Containers and Images

A **container** is a runtime instance of an **image**.

- An image contains all the code, dependencies, and instructions on how to run the application.
- Containers package software into standardized units.

Almost everyone uses the word container to describe both of these concepts; you never actually build or download a container since they only exist during runtime.

Images are immutable. You can use existing images to create a new image by adding new layers on top of the existing ones.

## Docker

Docker is the most popular containerization technology and pioneered standards today. Docker is a set of products that help manage images and containers. The Docker engine, for example, turns images into containers. Docker Compose is a tool that allows for orchestration of multiple containers at the same time.

After installing Docker (platform specific), get started by running: `docker container run IMAGE-NAME`. For testing our installation, let's run the image hello-world: `docker container run hello-world`. After installing docker, I had to give permissions to docker.sock. This can be done the quick and dirty way: `sudo chmod 666 /var/run/docker.sock` or the 'proper' way: https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user

The image *hello-world* was not on our machine, so it downloaded and ran it from the [Docker Hub](https://hub.docker.com/_/hello-world).

Image names are in the following format: `registry/organization/image:tag`. In this case, the 3 missing fields defaulted to: `index.docker.io/library/hello-world:latest`. The digest is a unique hash that represent the image; it represents whether an image has changed or not.

We can use `docker container ls -a` to list all containers that have been exited. A container can be started again with `docker start [ID OR NAME]`. We can kill a running container with `docker kill [ID OR NAME]`. Other commands: `docker image`, `docker commit`, `docker run [image]`.

## Dockerfile

A Dockerfile is a simple text file that contains the instructions for creating a new image. A Dockerfile might look like this:

```Dockerfile
FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only-production

ENV DEBUG=playground:*

CMD npm start
```

Because this Dockerfile will copy all files from the Dockerfile's directory to the working directory, we want to add a .dockerignore in the same type of format as a .gitignore. This is down to create a smaller, more minimal image.

## Using docker-compose

Instead of memorizing complicated scripts, or writing .sh files, we can create yaml files to manage our images to declare what we want to do allowing for more expressive methods.

```yml
version: '3.8'            # Version 3.8 is quite new and should work

services:
  app:                    # The name of the service, can be anything
    image: express-server # Declares which image to use
    build: .              # Declares where to build if image is not found
    ports:                # Declares the ports to publish
      - 3000:3000
```

Now we can use `docker-compose up` to build a run; rebuild with the ``-build`` flag, run in the background with the detached `-d` flag, and `docker-compose down` to shut down the image.

## Utilizing containers in development

Improve quality of life.
