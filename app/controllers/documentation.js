import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  i18n: service(),
  apiVersion: 'v1',
  currentOperation: 'get-started',
  currentDocLink: computed('i18n.locale', 'apiVersion', 'currentOperation', function(){
    const currentDocLink = `documentation/${this.get('apiVersion')}/${this.get('i18n.locale')}/${this.get('currentOperation')}/${this.get('currentOperation')}.html`
    return currentDocLink;
  }),

  actions: {
    setLocale(locale){
      this.set('i18n.locale', locale);
      this.send('refreshModel');
    }
  }
});
