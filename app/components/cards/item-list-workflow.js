import Ember from 'ember';

export default Ember.Component.extend({
  
  store: Ember.inject.service('store'),
  classNames:['table-item'],
  tagName: 'tr',
  toDelete: '',

  actions: {
    submit(){
      this.get('store').findRecord('workflow', this.get('toDelete')).then(function(model){model.destroyRecord(); });
      this.set('modal3', false);
      $("#flash span").text("The workflow was deleted.").show().parent().fadeIn().delay(2000).fadeOut('slow', function() { $("#flash span").text('') });
    },
    deleteWorkflow(workflow){
      this.set('name', "Deleting workflow " + workflow.get('name'));
      this.set('toDelete', workflow.get('id'));
      this.set('modal3', true);
    },
  },
});
