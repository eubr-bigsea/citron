import Component from '@ember/component';
import Ps from 'npm:perfect-scrollbar';

export default Component.extend({
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
