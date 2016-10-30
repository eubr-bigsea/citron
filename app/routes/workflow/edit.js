import Ember from 'ember';
import groupBy from 'lemonade-ember/utils/group-by';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  model(params) {
    this._super(...arguments);

    return RSVP.hash({
      workflow: this.get('store').findRecord('workflow', params.id),
      operations: groupBy(this.store.findAll('operation'), 'categories')
    });
  }
});
