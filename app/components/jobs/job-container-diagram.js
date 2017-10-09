import Ember from 'ember';
import Ps from 'npm:perfect-scrollbar';
export default Ember.Component.extend({
  actualTask: '',
  message: '',

  didInsertElement(){
    var component = this;
    Ps.initialize(document.getElementById("lemonade-container"));

    if(this.get('job').data.status == "error"){
      this.get('stepsLogs').forEach(function(el) {
        if(el.status == "ERROR"){
          var modal = {
            target: el.task.id,
          };
          component.set('modalContent', modal);
          component.set('modal', true);
        }
      });
    }
  },
  actions:{
    openLogs(taskId){
      var modal = {
        target: taskId,
      };
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
