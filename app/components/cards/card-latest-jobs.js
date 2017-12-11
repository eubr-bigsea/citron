import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  sessionAccount: service(),

  didInsertElement(){
    var cardId = this.get('conf.card-id');
    var userId = this.get('sessionAccount.userId');

    this.get('store').findRecord('card', cardId, { reload: true }).then((card) => {
      this.set('cardjobs', card);
      this.get('store').query('job', {
        user_id: userId,
        enabled: true,
        page: '1',
        size: card.get('content.size'),
        sort: 'updated_at',
        asc: false
      }).then((jobs) => {
        this.set('jobs', jobs);
      });

    });
  }
});

