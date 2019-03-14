import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import groupBy from "citron/utils/group-by";
import { extrasJson } from "citron/utils/documentation-json";

export default Route.extend({
  i18n: service(),

  model() {
    const query = {
      lang: this.get("i18n.locale"),
      platform: "1"
    };
    return this.store.query("operation", query);
  },
  setupController(controller, model) {
    let data = groupBy(
      model.map(o => {
        return o.toJSON();
      })
    );

    let operations = [];
    let key;
    let locale = this.get("i18n.locale");
    for (key in extrasJson) {
      let operation = {
        group: extrasJson[key]["name"][locale],
        operation: {
          slug: extrasJson[key]["slug"]
        }
      };
      operations.push(operation);
    }
    operations.forEach(op => {
      data.unshift(op);
    });
    controller.set("data", data);
    this._super(...arguments);
  },
  actions: {
    refreshModel() {
      this.refresh();
    }
  }
});
