
# Cache

## Section

> Effectively Dealing with Time

## Learning objectives

- To learn how to validate stateful problems that rely on the element of time

## Problem description

> A memory cache is a simple storage paradigm. A dictionary is a good example of a memory cache. It’s values are stored and retrieved via a key. Unlike a dictionary, it’s data goes stale as defined by a time to live (TTL). It also has a maximum capacity. Once the cache’s capacity is reached the least-recently-used key-value pair is removed and replace with the new incoming value. The cache is to hold a maximum of 100 entries with a TTL of 60 seconds. Assume the key and value are always strings.

## Getting started

To set up the project, run the following command:

```bash
npm install
```

## To run the tests in development mode

To run the tests and have them reload when you save, run the following command:

```bash
npm test:dev
```