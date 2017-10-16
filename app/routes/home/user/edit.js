import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin,{
  model(params){
    this._super(...arguments);
    return this.store.findRecord('user', params.id);
  }
});
