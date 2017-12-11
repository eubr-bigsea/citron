import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
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
  actions: {
    saveGrid(conf){
      var cardGrid = this.get('currentModel');
      cardGrid.set('configurations', conf);
      cardGrid.save();
    },
  }
});
