import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service } } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service(),

  model() {
    var params = {
      user_id: this.get('sessionAccount.userId'),
      enabled: true,
    };

    return this.store.query('workflow', params );
  },
});
