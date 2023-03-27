import { objectType } from "nexus";

export const questions = objectType({
  name: "question",
  definition(t) {
    t.nonNull.int("id");
    // t.boolean("Open");
    t.nonNull.boolean("required");
    t.string("questionText");
    t.nonNull.list.nonNull.field("options", {
      type: "option",
      resolve(parent, args, context) {
        return context.prisma.question
          .findUnique({ where: { id: parent.id } })
          .options();
      },
    });
    t.nonNull.field("form", {
      type: "Form",
      resolve(parent, args, context) {
        return context.prisma.question
          .findUnique({ where: { id: parent.id } })
          .containedBy();
      },
    });
  },
});
