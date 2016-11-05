import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    if (this.get('field.values_url')) {
      Ember.$.get(this.get('field.values_url')).then((response) => {
        this.set('parsedValues', response.map((v) => {
          return { "key": v.id, "value": v.name };
        }));
      });
    }
  }
});
