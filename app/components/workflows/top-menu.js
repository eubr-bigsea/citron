import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  didInsertElement: function(){
    this.$('#flash').hide();
  },

  actions: {
    deleteWorkflows(){
      this.set('modal3', true);
    },
  }
});
