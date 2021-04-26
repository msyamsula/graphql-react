import _ from "lodash"
import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt } from "graphql"
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
            resolve: async(personvalue, args) => {
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

export const schema = new GraphQLSchema({
    query: RootQuery
})