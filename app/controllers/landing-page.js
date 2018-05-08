import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  i18n: service(),

  actions: {
    setLocale(locale){
      this.set('i18n.locale', locale);
    }
  }
});
