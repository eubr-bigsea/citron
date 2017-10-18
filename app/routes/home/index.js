import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  sessionAccount: service(),

  model(){
    var userId = this.get('sessionAccount.userId');
    var params = {
      user_id: userId,
      enabled: true,
      page: '1',
      size: '5',
      sort: 'updated_at',
      asc: false
    };
    return RSVP.hash({
      user: this.store.findRecord('user', userId),
      workflows: this.store.query('workflow', params),
      jobs: this.store.query('job', params),
      cards: this.store.query('card', params),
    });
  },
  actions: {
    editCards(id){
      var isChecked = $('#'+ id).is(":checked");
      var user = this.get('currentModel.user');
      if(isChecked){
        this.get('store').findRecord('card',id).then(
          function(card){
            user.get('cards').pushObject(card);
            user.save();
          });
      } else {
        this.get('store').findRecord('card',id).then(
          function(card){
            user.get('cards').removeObject(card);
            user.save();
          });
      }
    },
  }

});
