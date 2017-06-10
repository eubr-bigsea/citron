/* global NProgress */
import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
const { inject: { service } } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin,{
  session: service('session'),
  sessionAccount: service('session-account'),

  beforeModel() {
    return this._loadCurrentUser();
  },

  setupController(controller, model) {
    if(this.get('session.isAuthenticated')){
      controller.set('isAuthenticated', true);
    }
    this._super(controller, model);
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser();
  },

  _loadCurrentUser() {
    return this.get('sessionAccount').loadCurrentUser();
  },

  actions: {
    error(error, transition) {
      if( error.isAdapterError){
        if( error.message !== "The adapter operation was aborted") {
          var resource = transition.targetName.split('.')[0]
          return this.transitionTo(`/notFound?resource=${resource}`);
        }
      }
      return this.transitionTo('/notFound');
    },

    didTransition(){
      if(this.get('session.isAuthenticated')){
        this._loadCurrentUser();
        this.controller.set('isAuthenticated', true);
      }
    },

    loading(transition) {
      NProgress.start();

      transition.promise.finally(function() {
        NProgress.done();
      });
    }
  }
});
