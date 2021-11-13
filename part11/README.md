# Part 11 - CI/CD

## What is CI?

Continuous Integration refers to merging developer changes to the main branch often. We likely want to do some of these steps:

- Lint: Keep code clean and maintainable.
- Build: Put all of our code together into software.
- Test: Ensure we don't break existing features.
- Package: Put it all together in an easily movable batch.
- Deploy: Make it available to the world.

## Why is it important?

What if Alice committed directly to the master branch? What if Bob used a branch but didn't bother to run tests before merging? What if Charlie tries to build the software for production but does so with the wrong parameters?

The use of CI/CD allows us to:

- disallow commits to master
- allow merges only when deseired conditions are met
- build packages for production in the known environment of the CI system

## Important principles

1. CI/CD is not the goal. The goal is better, faster software development with fewer preventable bugs and better team cooperation. The end goal should be kept in mind at all times.
2. Processes should fail safely when something unexpected (good or bad) happens.
3. The required tasks are all performed, and performed in the right order.
4. Code should always be kept deployable.
5. Know what code is deployed (sha sum/version).

## Types of CI setup

For self-hosted options, Jenkins is the most popular. For cloud-hosted, GitHub Actions is very popular since its released in November 2019.

| Self-Hosted | Cloud-Hosted |
| --- | --- |
| Billing based on hardware. | Billing based on build time. |
| Setup of the environment is flexible but complicated. | Setup of the environment is easy but limited. |
| Secrets are never exposed. | Secrets could be exposted by those who get access. |
| Resources are limited only to the hardware purchased. | Resources are often set and can't be changed. |
| Great for larger and enterprise projects with multiple teams and projects. | Great for small and medium projects. |