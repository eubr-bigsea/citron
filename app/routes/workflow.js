import Ember from 'ember';
import groupBy from 'lemonade-ember/utils/group-by';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  model() {
    this._super(...arguments);
    return groupBy(this.store.findAll('operation'), 'categories');
  }
});

