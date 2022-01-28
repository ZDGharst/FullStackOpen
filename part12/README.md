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

## Utilizing containers for development

Reasons to develop in containers:

* Improve the quality of life of development by bypassing the need to install and configure tools more than one time by utilizing containers for development. We can bind files via setting volumes within docker-compose files.
* Keep the environment similar between development and production to prevent bugs that appear only in production.
* Avoid differences between developers and their personal environments.
* Help new team members hop in by having them install container runtime only.

```yaml
  mongo:
    image: mongo
    ports:
     - 3456:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: example
      MONGO_INITDB_DATABASE: the_database
    volumes:       - ./mongo/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js
```

Data can be persisted across containers through the use of volumes. For example, you can bind ./mongo\_data on your machine to /data/db in the container.

## More Docker Commands

`exec` is a handy command to jump straight into a running container. `volume` allows for listing, inspecting, deleting, etc. volumes.

## Using multiple stages

A Dockerfile can include multiple stages.

```Docker
# The first FROM is now a stage called build-stage
FROM node:16 AS build-stage
WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

# This is a new stage, everything before this is gone, except the files we want to COPY
FROM nginx:1.20-alpine

# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the docker hub page
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
```

## Communication between containers

Communicating between containers in the same docker network is very easy:

```
$ docker-compose run debug-helper wget -O - http://hello-front-dev:3000
```

The "domain name" in this case is just the name of the container in the docker-compose file. In a more ambitious environment, a reverse proxy would need to be used, such as Nginx or Apache.

## Next Steps

While containers are fun for development, they're best used in production. The next step in learning is in orchestration tooling, such as Kubernetes.

