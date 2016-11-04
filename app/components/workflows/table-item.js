import Ember from 'ember';

export default Ember.Component.extend({
  classNames:['item'],
  tagName: 'li',

  actions: {
    deleteWorkflow(workflow){
      var confirmText = `Delete workflow ${workflow.get('name')} ?`;
      if(confirm( confirmText)){ workflow.destroyRecord(); }
    },
  },
});
