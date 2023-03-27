import { objectType, extendType } from "nexus";
import { questions } from "./question";

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

// export const formQuery = extendType({
//   type: "Query",
//   definition(t) {
//     t.nonNull.field("getForms", {
//       type: "Form",
//       resolve(parent, args, context) {
//         return context.prisma.form;
//       },
//     });
//   },
// });
