/* global NProgress */
import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
const { inject: { service } } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin,{
  i18n: service(),
  session: service(),
  sessionAccount: service(),

  beforeModel() {
    return this._loadCurrentUser();
  },

  model(params) {
    if(params && params.lang){
      this.set('i18n.locale', params.lang);
      this.set('locale', params.lang);
    } else if (this.get('session.data.locale')){
      this.set('i18n.locale', this.get('session.data.locale'));
      this.set('locale', this.get('session.data.locale'));
    }
  },

  setupController(controller, model) {
    let session = this.get('session');
    if(controller.set('isAuthenticated', session.get('isAuthenticated'))){
      let token = session.get('data.authenticated.token');
      let email = session.get('data.authenticated.email');
      $.ajaxSetup({
        headers: {
          'Authorization': `Token token=${token}, email=${email}`,
          'X-Auth-Token': '123456',
          'Locale': this.get('session.data.locale')
        }
      });
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
