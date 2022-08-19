const { AuthenticationError } = require('apollo-server-express');
const {User} = require('../models');
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')

                return userData;
            }

            throw new AuthenticationError('Not logged in ');
        },

    },

    Mutation: {
        login: async (parent, {body}) => {
            const user = await User.findOne({ $or: [{username: body.username}, { email: body.email }] });

            if (!user) {
                throw new AuthenticationError('Cant find this user');
            }

            const correctPw = await user.isCorrectPassword(body.password);

            if(!correctPw) {
                throw new AuthenticationError('Wrong Person');
            }

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);

            if(!user) {
                return new AuthenticationError('Something is Wrong!');
            }

            const token = signToken(user);
            return { token,user};
        },
    }
}

module.exports = resolvers;