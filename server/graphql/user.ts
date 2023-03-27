import { objectType } from "nexus";

export const user = objectType({
  name: "user",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("email");
    t.nonNull.string("img");
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
