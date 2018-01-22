import Route from '@ember/routing/route';
import $ from 'jquery';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import NProgress from '@nprogress';

export default Route.extend(ApplicationRouteMixin,{
  i18n: service(),
  session: service(),
  sessionAccount: service(),

  beforeModel(){
    //debugger
  },

  activate(){
    let isAuthenticated = this.get('session.isAuthenticated');

    if(isAuthenticated){
      let data = this.get('session.data.authenticated');
      $.ajaxSetup({
        headers: {
          'Authorization': `Token token=${data.token}, email=${data.email}`,
          'X-Auth-Token': '123456',
          'Locale': this.get('i18n.locale'),
          'X-User-Id': data.userId,
        }
      });
    }
    return this._loadCurrentUser();
  },


  model(params) {
    let authenticated = this.get('session.isAuthenticated');
    let data = this.get('session.data');

    if(params && params.lang){
      this.set('i18n.locale', params.lang);
      $.ajaxSetup({ headers: {'Locale': params.lang } });
    } else if (authenticated) {
      this.set('i18n.locale', data.locale);
      $.ajaxSetup({ headers: {'Locale': data.locale } });
    }
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser();
  },

  _loadCurrentUser() {
    return this.get('sessionAccount').loadCurrentUser();
  },

  actions: {
    error(error) {
      console.log(error);
      if( error.isAdapterError ){
        if( error.errors.findBy('status', '404') ) {
          return this.transitionTo('home.not-found');
        }
      }
      return this.transitionTo('/maintenance');
    },

    loading(transition) {
      NProgress.start();
      transition.promise.finally(() => { NProgress.done(); });
    }
  }
});
