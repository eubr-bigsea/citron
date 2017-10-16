import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  i18n: service(),
  session: service(),
  locales: alias('i18n.locales'),
  currentLocale: alias('i18n.locale'),

  actions: {
    save(){
      this.get('user').save().then(()=>{
        this.set('i18n.locale', this.get('user.locale'));
        this.get('session').set('data.locale', this.get('user.locale'));
      });
    }
  }
});
