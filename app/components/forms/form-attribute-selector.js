import { set } from "@ember/object";
import { A } from "@ember/array";
import FormComponent from "citron/lib/form-component";
import { computed } from "@ember/object";
import $ from "jquery";

export default FormComponent.extend({
  classNameBindings: ["error"],
  error: computed("field.error", function() {
    return this.get("field.error");
  }),

  didInsertElement() {
    const component = this;
    component.$("select").each(function() {
      let $this = $(this);

      $this.on("select2:select", function(e) {
        let elm = e.params.data.element;
        let $elm = $(elm);
        let $t = $(this);
        $t.append($elm);
        $t.trigger("change.select2");
      });
      $this.select2({
        tags: true,
        dropdownParent: component.$(),
        data: component.get("parsedValues")
      });
    });
  },

  didReceiveAttrs() {
    this.set("parsedValues", A());
    let parsed = this.get("parsedValues");
    let uiPorts = this.get("task.uiPorts");
    let values = null;
    if (uiPorts && uiPorts.inputs) {
      let attributes = [];
      for (let i = 0; i < uiPorts.inputs.length; i++) {
        attributes = attributes.concat(uiPorts.inputs[i].attributes);
      }
      values = [...new Set(attributes)];
    }
    let currentValue = this.get("currentValue");

    if (values) {
      values.forEach(el => {
        if (parsed.findBy("id", el) === undefined) {
          parsed.addObject({
            id: el,
            text: el,
            selected: false
          });
        }
      });
    }

    if (currentValue) {
      currentValue.forEach(el => {
        if (parsed.findBy("id", el) === undefined) {
          parsed.addObject({
            id: el,
            text: el,
            selected: true
          });
        } else {
          var current = parsed.findBy("id", el);
          set(current, "selected", true);
        }
      });
    }
  },
  actions: {
    valueChanged() {
      this._super(this.$("select").val());
    }
  }
});
