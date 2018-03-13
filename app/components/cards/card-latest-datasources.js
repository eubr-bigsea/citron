import Component from '@ember/component';
import { inject as service } from '@ember/service';
import config from '../../config/environment';

export default Component.extend({
  store: service(),
  sessionAccount: service(),
  i18n: service(),
  session: service(),

  didReceiveAttrs(){
    this._super(...arguments);
    let token = this.get('session.data.authenticated.token');
    let email = this.get('session.data.authenticated.email');
    this.set('limoneroUrl', `${config.limonero}/datasources/`)
    this.set('endPoint', `/download?Token token=${token} email=${email}&token=123456`)
  },


  didInsertElement(){
    this.set('locale', this.get('i18n.locale'));
    var cardId = this.get('conf.card-id');
    var userId = this.get('sessionAccount.userId');

    this.get('store').findRecord('card', cardId, { reload: true }).then((card) => {
      this.set('card', card);
      this.get('store').query('datasource', {
        user_id: userId,
        enabled: true,
        page: '1',
        size: card.get('content.size'),
        sort: 'updated',
        asc: false
      }).then((datasources) => {
        if(!this.isDestroyed){
          this.set('datasources', datasources);
        }
      });
    });
  }
});
