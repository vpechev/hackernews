# Hackernews

## Overview 

GraphQL project for testing purposes.
The following project is inspired by practical part of [How to GraphQL](https://www.howtographql.com/) tutorial.

## Environment setup

In order to run your server you need the execute the following command: 

``` sh
node src/index.js
```

A vscode configuration is also provided, so you can run & debug the application.
Once the application is started, you can operate with it through a GraphQL playground on the following [url](http://localhost:4000/)

## Sample queries

* Find all links

``` graphql
query {
  feed {
    id
    url
    description
  }
}
```

* Find particular link by id

``` graphql
query {  
  link(id: "link-0") {
    id
    url
    description
  }
}
```

* Add new link

``` graphql
mutation {
  createLink(
    url: "www.prisma.io"
    description: "Prisma replaces traditional ORMs 5"
  ) {
    id
  }
}
```

* Change information about some link

``` graphql
mutation {
  updateLink(
    id: "link-0"
    url: "www.prisma.bg"
    description: "some updated link"
  ) {
    id
    url
    description
  }
}
```

* Delete link

``` graphql
mutation {
  deleteLink(
    id: "link-0"
  ) {
    id
    url
    description
  }
}
```