import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['option-bar'],

  didInsertElement(){
    if(Ember.$("[rel=tooltip]").is(':focus')){
      Ember.$("[rel=tooltip]").tooltip({ placement: 'right'});
    }
  },

  actions: {
    saveWorkflow() {
      this.get('workflow').save();
    }
  }
});
