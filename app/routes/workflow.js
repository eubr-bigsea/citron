import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

<<<<<<< HEAD
export default Ember.Route.extend(AuthenticatedRouteMixin,{
=======
export default Ember.Route.extend({
  model() {
    this._super(...arguments);
    return groupBy(this.store.findAll('operation'), 'categories');
  }
>>>>>>> Correções feitas no css
});
