import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  didInsertElement(){
    var cardId = this.get('conf.card-id');

    this.get('store').findRecord('card', cardId, { reload: true }).then((card) => {
      if(!this.isDestroyed){
        this.set('card', card);
      }
    });
  }
});
