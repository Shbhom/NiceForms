import { prisma } from "@prisma/client";
import { arg, extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const user = objectType({
  name: "user",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("email");
    // t.nonNull.string("img");
    t.list.nonNull.field("forms", {
      type: "Form",
      resolve(parent, args, context) {
        return context.prisma.user
          .findUnique({ where: { id: parent.id } })
          .forms();
      },
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteUser", {
      type: "user",
      args: { id: nonNull(intArg()) },
      async resolve(parent, args, context) {
        const delUser = await context.prisma.user.delete({
          where: { id: args.id },
        });
        return delUser;
      },
    }),
      t.nonNull.field("updateUser", {
        type: "user",
        args: {
          id: nonNull(intArg()),
          name: stringArg(),
          email: stringArg(),
        },
        async resolve(parent, args, context) {
          const { id, name, email } = args;
          const updatedUser = await context.prisma.user.update({
            where: { id: args.id },
            data: { id, name, email },
          });
          return updatedUser;
        },
      }),
      t.nonNull.field("updateUserId", {
        type: "user",
        args: {
          oldId: nonNull(intArg()),
          newId: nonNull(intArg()),
        },
        async resolve(parent, args, context) {
          const { newId, oldId } = args;
          const updatedUser = await context.prisma.user.update({
            where: { id: oldId },
            data: { id: newId },
          });
          return updatedUser;
        },
      }),
      t.nonNull.list.nonNull.field("getAllUsers", {
        type: "user",
        async resolve(parent, args, context) {
          return await context.prisma.user.findMany();
        },
      });
  },
});
