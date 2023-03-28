import { objectType, extendType, nonNull, stringArg, arg } from "nexus";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils/auth";
import { user } from "./user";

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.nonNull.string("token");
    t.nonNull.field("user", {
      type: "user",
    });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("login", {
      type: "AuthPayload",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        let user = await context.prisma.user.findFirst({
          where: { email: args.email },
        });
        if (!user) {
          throw new Error(`no user with email Id ${args.email}`);
        }
        const validate = await bcrypt.compare(args.password, user.password);
        if (!validate) {
          throw new Error("Incorrect password");
        }
        const token = jwt.sign({ userId: user.id }, APP_SECRET);

        return { token, user };
      },
    }),
      t.nonNull.field("signup", {
        type: "AuthPayload",
        args: {
          email: nonNull(stringArg()),
          name: nonNull(stringArg()),
          password: nonNull(stringArg()),
        },
        async resolve(parent, args, context) {
          const { email, name } = args;
          const password = await bcrypt.hash(args.password, 10);
          const newUser = await context.prisma.user.create({
            data: { email, name, password },
          });
          const token = jwt.sign(
            { userId: newUser.id, userName: newUser.name },
            APP_SECRET
          );
          return {
            token,
            user: newUser,
          };
        },
      });
  },
});
