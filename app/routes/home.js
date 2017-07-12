import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

const { inject: { service} } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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

});
