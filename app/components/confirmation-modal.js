import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),

  actions:{
    submit(){
      this.set('modal', false);
    },

    cancel(){
      this.set('modal', false);
    },
  }
});
