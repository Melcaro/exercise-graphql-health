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
      resolve: async () => {
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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updateWeight: {
      type: UserWeightType,
      args: {
        userID: { type: GraphQLID },
        weight: { type: GraphQLInt },
        date: { type: GraphQLString },
      },
      resolve: async (parent, { userID, weight, date }) => {
        console.log('weight', userID);
        return await Store.updateUserWeight(userID, weight, date);
      },
    },
    updateTension: {
      type: UserTensionType,
      args: {
        userID: { type: GraphQLID },
        tension: { type: GraphQLInt },
        date: { type: GraphQLString },
      },
      resolve: async (parent, { userID, tension, date }) => {
        console.log('tension', userID);
        return await Store.updateUserTension(userID, tension, date);
      },
    },
    updateDrinkConsumption: {
      type: UserWaterConsumptionType,
      args: {
        userID: { type: GraphQLID },
        glassofwaterdrunk: { type: GraphQLInt },
        date: { type: GraphQLString },
      },
      resolve: async (parent, { userID, glassofwaterdrunk, date }) => {
        console.log('water', userID);
        return await Store.updateUserDrinkConsumption(
          userID,
          glassofwaterdrunk,
          date
        );
      },
    },
    updateExercices: {
      type: UserExercicesType,
      args: {
        userID: { type: GraphQLID },
        exercicetype: { type: GraphQLString },
        exerciceduration: { type: GraphQLInt },
        date: { type: GraphQLString },
      },
      resolve: async (
        parent,
        { userID, exercicetype, exerciceduration, date }
      ) => {
        console.log('ex', userID);
        return await Store.updateUserExercices(
          userID,
          exercicetype,
          exerciceduration,
          date
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
