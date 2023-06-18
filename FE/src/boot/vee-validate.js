import { boot } from "quasar/wrappers";
import { defineRule } from "vee-validate";
import { required, email, min, numeric } from "@vee-validate/rules";

export default boot(() => {
  defineRule("required", required);
  defineRule("email", email);
  defineRule("min", min);
  defineRule("numeric", numeric);
});
