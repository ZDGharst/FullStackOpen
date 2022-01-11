# Part 12 - Introduction to Containers

Containers encapsulate your appplication into a single package. This package includes all of the dependencies with the application; each container can run isolated from the other containers. Containers prevent the application inside from accessing files and resources of the device. Containers are OS-level virtualization; they are relatively lightweight and can be quick to scale. They can be ran identically almost anywhere.

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
