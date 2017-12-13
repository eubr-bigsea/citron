import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  sessionAccount: service(),

  model(){
    var userId = this.get('sessionAccount.userId');

    return this.store.findRecord('user', userId).then((user) => {
      return this.store.findRecord('cardGrid', user.get('cardGrid.id'));
    });
  },

  setupController(controller, model){
    controller.set('configurations', Ember.copy(model.get('configurations')));
  },

  actions: {
    saveGrid(items){
      var cardGrid = this.get('currentModel');
      var configurations = cardGrid.get('configurations');
      var video = null
      items.forEach((item) => {
        var card = configurations.findBy('card-id', item.el.data('card-id'));
        if(card.component === 'video'){
          video = { width: item.el.width(), height: item.el.height()}
        }
        set(card, 'x', item.x);
        set(card, 'y', item.y);
        set(card, 'height', item.height);
        set(card, 'width',  item.width);
      });

      cardGrid.save();
      if(video){
        $('#EmberYoutube-player').height(video.height - 102);
        $('#EmberYoutube-player').width(video.width - 42 );
      }
    },
  }
});
