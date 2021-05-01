import _ from "lodash"
import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLNonNull } from "graphql"
import axios from "axios"

const baseUrl = "http://localhost:5000"

const AccountType = new GraphQLObjectType({
    name: "Account",
    fields: () => ({
        id: { type: GraphQLInt },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    })
})

const PersonType = new GraphQLObjectType({
    name: "Person",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        account: {
            type: AccountType,
            resolve: async(parentValue, args) => {
                console.log(parentValue);
                const accountId = parentValue.accountId
                const url = baseUrl + "/account"
                const params = {
                    params: {
                        id: accountId
                    }
                }
                const resp = await axios.get(url, params)
                return resp.data
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "Root",
    fields: {
        Person: {
            type: PersonType,
            args: { id: { type: GraphQLInt } },
            resolve: async(parentValue, args) => {
                const url = baseUrl + "/person"
                const params = {
                    params: {
                        id: args.id
                    }
                }
                const resp = await axios.get(url, params)
                console.log(resp.data);
                return resp.data

            }
        },
        Account: {
            type: AccountType,
            args: { id: { type: GraphQLInt } },
            resolve: async(parentValue, args) => {
                const url = baseUrl + "/account"
                const params = {
                    params: {
                        id: args.id
                    }
                }
                const resp = await axios.get(url, params)
                return resp.data
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAccount: {
            type: AccountType,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async(parentValue, args) => {
                console.log("mutation is called");
                const url = baseUrl + "/account"
                const reqBody = {
                    username: args.username,
                    password: args.password
                }

                const resp = await axios.post(url, reqBody)
                console.log(resp.data);
                return {
                    "username": reqBody.username,
                    "password": reqBody.password
                }
            }
        },
        addPerson: {
            type: PersonType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLString },
                accountId: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: async(parentValue, args) => {
                const url = baseUrl + "/person"
                const body = {
                    name: args.name,
                    address: args.address,
                    account_id: args.accountId
                }

                const res = await axios.post(url, body)
                return res.data
            }
        },
        editPerson: {
            type: PersonType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLString },
                accountId: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: async(parentValue, args) => {
                const url = baseUrl + "/person/" + args.id
                const body = {
                    name: args.name,
                    address: args.address,
                    account_id: args.accountId
                }

                const res = await axios.put(url, body)
                return res.data
            }
        }
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})