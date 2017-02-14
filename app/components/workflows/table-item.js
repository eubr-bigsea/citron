import Ember from 'ember';

export default Ember.Component.extend({
  classNames:['item'],
  tagName: 'li',

  didInsertElement(){
    if(Ember.$("[rel=tooltip]").is(':focus')){
      Ember.$("[rel=tooltip]").tooltip({ placement: 'right'});
    }
  },

  actions: {
    deleteWorkflow(workflow){
      var confirmText = `Delete workflow ${workflow.get('name')} ?`;
      if(confirm( confirmText)){ workflow.destroyRecord(); }
    },
  },
});
