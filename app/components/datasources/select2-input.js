import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    this.$('select').select2({
      dropdownParent: this.$(),
      tags: true
    });
  },
});
