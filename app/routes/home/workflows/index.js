import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service } } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  sessionAccount: service(),

  model() {
    var params = {
      user_id: this.get('sessionAccount.userId'),
      enabled: true,
    };

    return this.store.query('workflow', params );
  },

  setupController(controller, model){
    controller.set('locale', this.get('session.data.locale'));
    return this._super(controller, model);
  }

});
