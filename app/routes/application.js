import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
/* global NProgress */


export default Ember.Route.extend(ApplicationRouteMixin,{
  actions: {

    loading(transition) {
      NProgress.configure({ easing: 'ease', speed: 1000 });
      NProgress.start();

      transition.promise.finally(function() {
        NProgress.done();
      });
    }

  }
});
