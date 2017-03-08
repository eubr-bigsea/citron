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
      var component = this;
      this.get('workflow').save().then(function(){
        component.get('hasChanged')(false);
        component.get('alert')({
          type: 'Success',
          content:'All modifications has been saved.'
        });
      });
    },
    deleteWorkflow(){
        this.get('alert')({
          type: 'Delete',
          content:'Do you want to delete this workflow?',
        });
    }
  }
});
