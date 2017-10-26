import Component from '@ember/component';
import Ps from 'npm:perfect-scrollbar';

export default Component.extend({
  actualTask: '',
  message: '',

  didInsertElement(){
    var component = this;
    var found = false;
    Ps.initialize(document.getElementById("lemonade-container"));

    if(this.get('job').data.status == "error"){
      this.get('stepsLogs').forEach(function(el) {
        if(el.status == "ERROR"){
          var modal = {
            target: el.task.id,
            message: component.get('job').data.status_text,
          };
          component.set('modalContent', modal);
          component.set('modal', true);
          found = true;
        }
      });
      if(!found){
        this.send('openLogs', null);
      }
    }
  },
  actions:{
    openLogs(taskId){
      var modal;
      if(taskId == null){
        modal = {
          target: null,
          title: 'General error',
          message:this.get('job').data.status_text,
        };
      } else {
        modal = {
          target: taskId,
        };
      }
      this.set('modalContent', modal);
      this.set('modal', true);
    },
    generateLogs(task, message){
      this.set('actualTask', task);
      this.set('message', message);
    },
    submit(){},
  }
});
