import Ember from 'ember';
import Ps from 'npm:perfect-scrollbar';
export default Ember.Component.extend({
  actualTask: '',
  message: '',

  didInsertElement(){
    Ps.initialize(document.getElementById("lemonade-container"));
  },
  actions:{
    generateLogs(task, message){
      this.set('actualTask', task);
      this.set('message', message);
    }
  }
});
