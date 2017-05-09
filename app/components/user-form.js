import Ember from 'ember';

export default Ember.Component.extend({
  i18n: service(),
  locales: Ember.computed.alias('i18n.locales'),
  currentLocale: Ember.computed.alias('i18n.locale'),

  actions: {
    save(){
      this.get('user').save();
      this.set('i18n.locale', this.get('user.locale'));
    }
  }
});
