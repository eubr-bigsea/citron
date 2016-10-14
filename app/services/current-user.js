import Ember from 'ember';

export default Ember.Service.extend({
  current_user: null,

  init(){
    this._super(...arguments);
    this.set('current_user', []);
  },

  set(user){
    this.get('current_user').pushObject(user)
  }

});

