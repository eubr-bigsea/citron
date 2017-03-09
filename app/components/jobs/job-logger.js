import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',

  didReceiveAttrs(){
    var steps = this.get('steps');
    var operations = this.get('operations');
    steps.forEach(function(step, index, array){
      var opIndex = JSON.stringify(step.operation.id);
      var operation = operations.findBy('id', opIndex);
      step.operation.name = operation.get('name');
      step.operation.icon = operation.get('icon');
    });
  },
  didUpdate(){
    debugger;
  },
});
