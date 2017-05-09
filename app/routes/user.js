import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
<<<<<<< HEAD
  model(params){
    this._super(...arguments);
    return this.store.findRecord('user', params.id);
  }
});
