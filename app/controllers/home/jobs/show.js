import Controller from '@ember/controller';
import config from '../../../config/environment';


export default Controller.extend({
  taskModal: false,
  modalCode: false,
  isRunning: false,
  isCompleted: false,
  activeTab: 'logs',
  selectedTask: null,
  codeContent: { title: 'modal.code.title', cancelButton: 'modal.code.cancelButton', code: null},

  init() {
    this._super(...arguments);
    this.addObserver('job.status', this, 'statusDidChange');
  },

  statusDidChange() {
    let code = this.get('codeContent.code');
    if(!code){
      let job = this.get('job');
      $.ajax({
        type: 'GET',
        url:`${config.stand}/jobs/${job.id}/source-code`
      }).then(
        (response) => {
          if(response.source){
            var lang = eval(`Prism.languages.${response.lang}`);
            var highlighted = Prism.highlight(response.source, lang)
            this.set('codeContent.code', highlighted);
          }
        },
        (error) => {
          console.log('ERROR', error);
        }
      );
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
      $(".__job__show").toggleClass("toggled");
    }
  }
});
