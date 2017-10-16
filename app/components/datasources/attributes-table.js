import Component from '@ember/component';

export default Component.extend({
  actions: {
    addAttr(){
      let attributes = this.get('attributes');
      let newAttr = {
        attribute_privacy: null,
        deciles: null,
        description: null,
        distinct_values: null,
        enumeration: false,
        feature: false,
        id: null,
        label: false,
        max_value: null,
        mean_value: null,
        median_value: null,
        min_value: null,
        missing_representation: null,
        missing_total: null,
        name: null,
        nullable: false,
        precision: null,
        scale: null,
        size: null,
        std_deviation: null,
        type: "CHARACTER"
      };

      attributes.pushObject(newAttr);

    },
    removeAttr(attr){
      let attributes = this.get('attributes');
      attributes.removeObject(attr);
    }
  }
});
