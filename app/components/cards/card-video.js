import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  didInsertElement(){
    var cardId = this.get('conf.card-id');

    this.get('store').findRecord('card', cardId, { reload: true }).then((card) => {
      this.set('card', card);
    });
  },

  didRender(){
    var el = this.$().find('.card-block');
    var width = el.width();
    var height = el.height();
    var player = el.find('#EmberYoutube-player');
    player.height(height)
    player.width(width);
  }
});
