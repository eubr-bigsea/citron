import Ember from 'ember';

/* global NProgress */

export default Ember.Route.extend({
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
