import Ember from 'ember';

const { inject: { service }, Component } = Ember;

export default Component.extend({
  i18n: Ember.inject.service(),
  classNames: ['language-select'],
  
  session: service('session'),
  currentUser: service('current-user'),
  
  locales: Ember.computed('i18n.locale', 'i18n.locales', function() {
    const i18n = this.get('i18n');
    return this.get('i18n.locales').map(function (loc) {
      return { id: loc, text: i18n.t('language-select.language.' + loc) };
    });
  }),

  actions: {
    setLocale(val) {
      this.set('i18n.locale', val);
    },
    invalidateSession(){
      this.get('session').invalidate();
    }
  }
});
