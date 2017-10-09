import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',

  didReceiveAttrs(){
    var steps = this.get('job.steps');
    var operations = this.get('operations');
    var component = this;
    steps.forEach(function(step){
      var opIndex = JSON.stringify(step.operation.id);
      var operation = operations.findBy('id', opIndex);
      step.operation.name = operation.get('name');
      step.operation.icon = operation.get('icon');
      component.get('stepsLogs').addObject(step);
    });
  },

  didInsertElement(){
    this.$('#tasks-list').metisMenu();
  }
});
