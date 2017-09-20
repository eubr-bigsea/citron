import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this.$('select').select2({
      dropdownParent: this.$(),
      tags: true
    });
  },
});
