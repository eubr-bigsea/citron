import Component from '@ember/component';

export default Component.extend({
  classNames:['table-item'],
  tagName: 'tr',

  actions: {
    deleteWorkflow(workflow){
      var confirmText = `Delete workflow ${workflow.get('name')} ?`;
      if(confirm( confirmText)){ workflow.destroyRecord(); }
    },
  },

});
