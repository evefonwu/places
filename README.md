# Places

A simple rental places database using fullstack GraphQL with React, Apollo, and Node

- create a place
- query all places
- query one place by id
- update a place
- delete a place

## Installation

Install React application dependencies

```
yarn install
```

Install GraphQL server dependencies

```
cd server
yarn install
```

## Usage

Start the server. Once the server starts, you should see the GraphQL playground running at http://localhost:4000

```bash
cd server
node src/index.js
```

Start the React application

```bash
yarn start
```

## Troubleshoot

Cannot connect error

- Start the server

```bash
cd server
node src/index.js
```

Bad request error

- Check your query
- Try query on GraphQL playground on http://localhost:4000

Making changes to the data model?

- Execute new migration and re-generate Prisma Client with every change to the data model such as adding a new table in schema.prisma. (For details see [HowToGraphQL](https://www.howtographql.com/graphql-js/6-authentication/))

## Roadmap

- GraphQL validations ?
- real-time subscriptions ?
- paginate listing ?

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
