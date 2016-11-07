import Ember from 'ember';
import groupBy from 'lemonade-ember/utils/group-by';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  model() {
    this._super(...arguments);

    return RSVP.hash({
      workflow: this.get('store').createRecord('workflow', {
        tasks: [],
        flows: [],
        user_id: 1,
        user_login: 'walter',
        user_name: 'Walter dos Santos Filho',
        name: "My new Workflow"
      }),
      operations: groupBy(this.store.findAll('operation'), 'categories')
    });
  }
});
