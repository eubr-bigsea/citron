import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin,{
  activate(){
    this._super(...arguments);
    this.controllerFor('password.request').set('successMessage', null);
    this.controllerFor('password.request').set('errorMessage', null);
    this.controllerFor('password.request').set('processingRequest', false);
    this.controllerFor('password.edit').set('successMessage', null);
    this.controllerFor('password.edit').set('errorMessage', null);
    this.controllerFor('password.edit').set('processingRequest', false);
  }
});
