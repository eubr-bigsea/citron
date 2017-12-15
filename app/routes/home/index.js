import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { copy } from '@ember/object/internals';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  sessionAccount: service(),

  model(){
    var userId = this.get('sessionAccount.userId');

    return this.store.findRecord('user', userId, {reload: true}).then((user) => {
      return this.store.findRecord('cardGrid', user.get('cardGrid.id'));
    });
  },

  setupController(controller, model){
    controller.set('configurations', copy(model.get('configurations')) );
  },

  actions: {
    saveGrid(items){
      var cardGrid = this.get('currentModel');
      var configurations = this.controller.get('configurations');
      if(items){
        items.forEach((item) => {
          var data = item.el.data();
          var card = configurations.findBy('uuid', data.uuid);
          if(card){

            set(card, 'x', item.x);
            set(card, 'y', item.y);
            set(card, 'height', item.height);
            set(card, 'width',  item.width);
          }

          if( data.cardComponent === 'video'){
            console.log(data.uuid)
            var el = item.el.find('#EmberYoutube-player');
            el.height(item.el.height() - 102);
            el.width(item.el.width() - 42 );
          }
        });
      }

      cardGrid.set('configurations', configurations);

      cardGrid.save();
    },
  }
});
