import { A } from '@ember/array';
import Controller from '@ember/controller';

export default Controller.extend({
  stepsLogs: A(),
  taskModal: false,
  selectedTask: null,

  actions: {
    selectTask(task){
      this.set('selectedTask', task);
      this.set('taskModal', true);
    }
  }
});
