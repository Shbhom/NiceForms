import { objectType, extendType, intArg, arg, nonNull, stringArg } from "nexus";
import { questions } from "./question";
import { user } from "./user";

export const Form = objectType({
  name: "Form",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.string("description");
    t.nonNull.list.nonNull.field("question", {
      type: "question",
      resolve(parent, args, context) {
        return context.prisma.form
          .findUnique({ where: { id: parent.id } })
          .questions();
      },
    });
    t.nonNull.field("postedBy", {
      type: "user",
      resolve(parent, args, context) {
        return context.prisma.form
          .findUnique({ where: { id: parent.id } })
          .postedBy();
      },
    });
  },
});

export const formQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getForms", {
      type: "Form",
      async resolve(parent, args, context) {
        const { userId } = context;
        const userForms = await context.prisma.form.findMany({
          where: { postedBy: { id: userId } },
        });
        if (!userForms) {
          throw new Error("No forms were found");
        }
        return userForms;
      },
    });
  },
});

export const FormMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Form",
      args: {
        name: nonNull(stringArg()),
        description: stringArg(),
      },
      async resolve(parent, args, context) {
        const { name, description } = args;
        const { userId } = context;
        const newForm = await context.prisma.form.create({
          data: { name, description, postedBy: { connect: { id: userId } } },
        });
        return newForm;
      },
    });
  },
});
