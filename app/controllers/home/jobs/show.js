/* global Prism */
import Controller from '@ember/controller';
import config from '../../../config/environment';
import $ from 'jquery';
import { run } from '@ember/runloop';

export default Controller.extend({
  taskModal: false,
  codeModal: false,
  reportModal: false,
  activeTab: 'logs',
  selectedTask: null,
  code: null,

  actions: {
    selectTask(task, tab){
      this.set('selectedTask', task);
      this.set('activeTab', tab);
      this.set('taskModal', true);
    },
    activateTab(tab){
      this.set('activeTab', tab);
    },

    stopJob(){
      let jobId = this.get('job.id');
      let workflowId = this.get('job.workflow.id');
      $.ajax({
        url: `${config.stand}/jobs/${jobId}/stop`,
        type: 'POST',
        data: {},
      }).then(
        run(() => {
          () => {
            this.transitionToRoute('home.workflows.draw', workflowId);
          },
            (error) => {
              console.log('Error', error.responseJSON);
              this.transitionToRoute('home.workflows.draw', workflowId);
            }
        })
      );
    },

    toggleCodeModal(){
      let code = this.get('code');
      if(code == 'NONE' || code == null){
        let job = this.get('job');
        $.ajax({
          type: 'GET',
          url:`${config.stand}/jobs/${job.id}/source-code`
        }).then(
          (response) => {
            if(response.source){
              var lang = eval(`Prism.languages.${response.lang}`);
              var highlighted = Prism.highlight(response.source, lang)
              this.set('code', highlighted);
              this.toggleProperty('codeModal');
            } else {
              this.set('code', 'NONE');
              this.toggleProperty('codeModal');
            }
          },
          (error) => {
            console.log('ERROR', error);
            this.toggleProperty('codeModal');
          }

        );
      } else {
        this.toggleProperty('codeModal');
      }
    },
    toggleReportModal(){
      this.toggleProperty('reportModal');
    },
    toggleLog(){
      $(".__job__show").toggleClass("toggled");
    }
  }
});
