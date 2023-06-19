
## 1. Setting up the API using chat-gpt

I was able to get an entire docker + postgres + express + typescript API set up using just chatgpt and this starter in about 10 minutes.

Then I asked it to generate a CURL command for me to test that it works. 

> curl -X POST -H "Content-Type: application/json" -d '{"name":"John Doe","email":"johndoe@example.com"}' http://localhost:3000/users

All good. Amazing. This just goes to show how the value differential has shifted. I was able to get this up and running completely by just specifying the What.

One thing I asked chatgpt was to make this idempotent for me. I asked it if we could just run the docker command get started and know that this would always work. 

That command to start everything and run it is:

> docker-compose up --build

Other important notes at this point?

### For teaching

> What code-first devs typically do is install everything locally. A local database (Postgres). Most don't make the shift to Docker, so that's going to be an incremental improvement along the straight line.


1. Get a basic create & edit user going using TypeScript + Express + some relational database (postgres, mysql). Often, developers at this point will opt for an ORM instead of just talking directly to a database because it's going to be easier to work with. Admittedly, that's a good point. So this first step should actually be: create & edit user using TypeScript + Express + Postgres + TypeORM (or Sequelize or some other ORM)

## Alright, based on where I currently am, I'm already getting annoyed with these ORMs. 

Let's specify everything we want in this first checkpoint.

## Checkpoint #1: Basic CRUD (code-first)

> let's get here and then paste the commit.

- create, edit, get user by user id
- use TypeScript
- use Express.js
- use Postgres
- use the simplest possible form of Postgres database management on my local machine w/ 
- can fetch using CURL and Postman 

## Checkpoint #2.1: Automate everything (docker)

## Checkpoint #2.2: 

