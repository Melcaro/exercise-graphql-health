const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');

const Store = require('../store/store');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    weight: {
      type: UserWeightType,
      resolve: async parent => {
        return await Store.getUserWeightByID(parent.id);
      },
    },
    waterConsumption: {
      type: UserWaterConsumptionType,
      resolve: async parent => {
        return await Store.getUserWaterConsumptionByID(parent.id);
      },
    },
    tension: {
      type: UserTensionType,
      resolve: async parent => {
        console.log(parent);
        return await Store.getUserTensionByID(parent.id);
      },
    },
    exercices: {
      type: UserExercicesType,
      resolve: async parent => {
        return await Store.getUserExercicesByID(parent.id);
      },
    },
  }),
});

const UserWeightType = new GraphQLObjectType({
  name: 'UserWeight',
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLInt },
    weight: { type: GraphQLInt },
    date: { type: GraphQLString },
  }),
});

const UserWaterConsumptionType = new GraphQLObjectType({
  name: 'UserWaterConsumption',
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLInt },
    glassofwaterdrunk: { type: GraphQLInt },
    date: { type: GraphQLString },
  }),
});

const UserTensionType = new GraphQLObjectType({
  name: 'UserTension',
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLInt },
    tension: { type: GraphQLInt },
    date: { type: GraphQLString },
  }),
});

const UserExercicesType = new GraphQLObjectType({
  name: 'UserExercice',
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLInt },
    exerciceduration: { type: GraphQLInt },
    exercicetype: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async (parent, args) => {
        return await Store.getUsers();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, { id }) => {
        return await Store.getUserByID(id);
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
