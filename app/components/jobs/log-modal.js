import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  oi: '',
  icone: '',

  didReceiveAttrs(){
    var steps = this.get('job.steps');
    var operations = this.get('operations');

    var opIndex = this.get('content.target');
    var operation = steps.findBy('task.id', opIndex);
    if(operation != undefined){
      this.set('oi', operation.operation.name);
      this.set('icone', operation.operation.icon);
    }

    if(operations != undefined){
      //component.get('stepsLogs').addObject(operation);
    }
  },

  actions:{
    submit(){
      this.set('modal', false);
    },

    cancel(){
      this.set('modal', false);
    },
  }

});
