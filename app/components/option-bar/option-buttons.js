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
      var component = this;
      this.get('workflow').destroyRecord().then(function(){
        component.get('hasChanged')(false);
        component.get('alert')({
          type: 'Success',
          content:'Workflow has been deleted.',
          func: "Ember.getOwner(component).lookup('router:main').transitionTo('home.workflows');"
        });
      });
    }
  }
});
