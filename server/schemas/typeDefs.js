const {gql} = require('apollo-server-express');

const typeDefs = gql`
type Auth {
    token: ID!
    user: User
    }
    
    type User {
        _id: ID
        username: String
        email: String
        bookcount: Int
    }
    
    type Book {
        bookId: Int
        authors: String 
        description: String 
        title: String
        link: String 
    }
    
    type Query  {
        me: User
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!:) Auth
    }
    `

    module.exports = typeDefs;