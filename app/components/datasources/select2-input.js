import Ember from 'ember';
import { translationMacro as t } from "ember-i18n";

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  i18n: service(),

  didInsertElement() {
    console.log(this.get('i18n').t('newLine'));
    this.set('values', [
      { value: ',', key:',' },
      { value: '.', key:'.'},
      { value: ';', key:';'},
      { value: "\\t [tab]", key:'{tab}' },
      { value: "\\n " + this.get('i18n').t('newLine'), key: '{new_line}'}
    ]);
    this.$('select').select2({
      dropdownParent: this.$(),
      tags: true
    });
  },
  didReceiveAttrs(){

  },
});
