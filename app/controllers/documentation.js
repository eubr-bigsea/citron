import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";
import { documentationJson } from "citron/utils/documentation-json";

export default Controller.extend({
  i18n: service(),
  pageSlug: "get-started",
  pageDocumentation: computed("pageSlug", "i18n.locale", function() {
    const locale = this.get("i18n.locale");
    const slug = this.get("pageSlug");
    if (
      documentationJson[slug] &&
      documentationJson[slug]["url"] &&
      documentationJson[slug]["url"][locale]
    ) {
      return documentationJson[slug]["url"][locale] + "?embedded=true";
    } else {
      return null;
    }
  }),

  actions: {
    setLocale(locale) {
      this.set("i18n.locale", locale);
      this.send("refreshModel");
    },
    setPageSlug(slug) {
      this.set("pageSlug", slug);
    }
  }
});
