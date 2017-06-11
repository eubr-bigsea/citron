import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  i18n: service(),
  session: service(),
  locales: Ember.computed.alias('i18n.locales'),
  currentLocale: Ember.computed.alias('i18n.locale'),

  actions: {
    save(){
      this.get('user').save().then(()=>{
        this.set('i18n.locale', this.get('user.locale'));
        this.get('session').set('data.locale', this.get('user.locale'));
      });
    }
  }
});
