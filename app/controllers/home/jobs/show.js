import { A } from '@ember/array';
import Controller from '@ember/controller';
import config from '../../../config/environment';


export default Controller.extend({
  taskModal: false,
  modalCode: false,
  isRunning: false,
  isCompleted: false,
  activeTab: 'logs',
  selectedTask: null,
  codeContent: { title: 'modal.code.title', cancelButton: 'modal.code.cancelButtom', code: null},

  init() {
    this._super(...arguments);
    this.addObserver('job.status', this, 'statusDidChange');
  },

  statusDidChange() {
    let code = this.get('codeContent.code');
    if(!code){
      let controller = this;
      let job = this.get('job');
      $.ajax({
        type: 'GET',
        url:`${config.stand}/jobs/${job.id}/source-code`,
        success: function(response){
          var lang = eval(`Prism.languages.${response.lang}`);
          if(response.source){
            controller.set('codeContent.code',Prism.highlight(response.source, lang));
          }
        }
      });
    }
  },

  actions: {
    selectTask(task){
      this.set('selectedTask', task);
      this.set('taskModal', true);
    },
    stopJob(){
      let jobId = this.get('job.id');
      let workflowId = this.get('job.workflow.id');
      $.ajax({
        url: `${config.stand}/jobs/${jobId}/stop`,
        type: 'POST',
        data: {},
      }).then(
        () => {
          this.transitionToRoute('home.workflows.draw', workflowId);
        },
        (error) => {
          console.log('Error', error.responseJSON);
          this.transitionToRoute('home.workflows.draw', workflowId);
        },
      );
    },
    toggleModalCode(){
      this.toggleProperty('modalCode');
    },
    toggleLog(){
      $("#job-diagram-container-wrapper").toggleClass("toggled");
    }
  }
});
