import Component from '@ember/component';
import { inject as service } from '@ember/service';
import config from '../../config/environment';


export default Component.extend({
  store: service(),
  session: service(),

  limoneroUrl: config.limonero,

  didInsertElement(){
    this._super(...arguments);
    let token = this.get('session.data.authenticated.token');
    let email = this.get('session.data.authenticated.email');
    this.set('limoneroUrl', `${config.limonero}/datasources/`)
    this.set('endPoint', `/download?Token token=${token} email=${email}&token=123456`)

    let bodyWrapper = this.$('.body-wrapper');
    let tbody = this.$('tbody');

    bodyWrapper.scroll(() => {
      if ( tbody.height() - ( bodyWrapper.height() + bodyWrapper.scrollTop() ) == 0) {
        this.get('loadNext')();
      }
    })
  },
  didRender(){
    this._super(...arguments);
    let bodyWrapper = this.$('.body-wrapper');
    let tbody = this.$('tbody');

    if(tbody.height() < bodyWrapper.height()){
      this.get('loadNext')();
    }
  }
});
