import { objectType } from "nexus";

export const option = objectType({
  name: "option",
  definition(t) {
    t.string("optionText");
  },
});
