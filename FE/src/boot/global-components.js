import { boot } from "quasar/wrappers";
import WInput from "src/components/WInput.vue";
import WBtn from "src/components/WBtn.vue";
import WCard from "src/components/WCard.vue";

export default boot(({ app }) => {
  app.component("WInput", WInput);
  app.component("WBtn", WBtn);
  app.component("WCard", WCard);
});
