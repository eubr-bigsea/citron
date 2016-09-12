import Ember from 'ember';

/* global NProgress */

let url = "http://beta.ctweb.inweb.org.br/tahiti";

export default Ember.Route.extend({
  model() {
    this._super(...arguments);
    return Ember.$.get(`${url}/operations`, {token: '123456'});
  },
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
