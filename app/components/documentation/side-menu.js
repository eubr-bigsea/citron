import $ from "jquery";
import Component from "@ember/component";
import Ps from "@perfect-scrollbar";

export default Component.extend({
  didInsertElement() {
    new Ps("#operations-list");
    $("#categories-list").metisMenu({ toggle: false });
  },
  didRender() {
    $("#categories-list").metisMenu("dispose");
    $("#categories-list").metisMenu({ toggle: false });
  },

  actions: {
    setOperation(slug) {
      this.get("setPageSlug")(slug);
    }
  }
});
