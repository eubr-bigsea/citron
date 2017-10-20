import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  name: '',
  icone: '',

  didReceiveAttrs(){
    var job = this.get('job.status_text');
    var steps = this.get('job.steps');
    var operations = this.get('operations');

    var opIndex = this.get('content.target');
    var operation = steps.findBy('task.id', opIndex);
    if(operation != undefined){
      this.set('name', operation.operation.name);
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
