import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import NProgress from 'npm:nprogress';
const { inject: { service } } = Ember;


export default Ember.Route.extend(ApplicationRouteMixin,{
  i18n: service(),
  session: service(),
  sessionAccount: service(),

  beforeModel() {
    this.set('i18n.locale', this.get('session.data.authenticated.locale'));
    return this._loadCurrentUser();
  },

  model(params) {
    this.set('i18n.locale', params.lang);
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
    didTransition(){
      if(this.get('session.isAuthenticated')){
        this._loadCurrentUser();
        this.controller.set('isAuthenticated', true);
      }
    },

    loading(transition) {
      NProgress.configure({ easing: 'ease', speed: 1000 });
      NProgress.start();

      transition.promise.finally(function() {
        NProgress.done();
      });
    }
  }
});
