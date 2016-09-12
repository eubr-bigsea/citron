import Ember from 'ember';

let url = "http://beta.ctweb.inweb.org.br/tahiti";

export default Ember.Route.extend({
  model() {
    this._super(...arguments);
    return Ember.$.get(`${url}/operations`, {token: '123456'});
  }
});
