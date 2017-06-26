import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

const { inject: { service} } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  sessionAccount: service(),

  model(){
    var userId = this.get('sessionAccount.userId');
    this.store.findRecord('user', userId).then(
      (user) => {
      }
    );
  },
  setupController(controller, model){
     controller.set('locale', this.get('session.data.locale'));
     return this._super(controller, model);
   }

});
