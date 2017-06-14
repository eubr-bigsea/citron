import Ember from 'ember';
import config from '../../config/environment';

const { inject: { service }, $:{ajax} } = Ember;

export default Ember.Component.extend({
  sessionAccount: service(),
  hasFinished: null,
  isRunning: null,

  didReceiveAttrs(){
    var jobStatus = this.get('job.status');
    this.set('isRunning', (jobStatus === 'running' || jobStatus === 'waiting'));
    this.set('hasFinished', (jobStatus === 'completed'));
  },
  didUpdate(){
    var jobStatus = this.get('job.status');
    this.set('isRunning', (jobStatus === 'running'));
    this.set('hasFinished', (jobStatus === 'completed'));
  },
  didRender(){
    if(this.get('job.status') === 'error'){
      $("#flashError").show();
    }
  },
  actions:{
    showLog(){
      Ember.$("#job-diagram-container-wrapper").toggleClass("toggled");
    },
    stop(){
      let jobId = this.get('job.id');
      let workflowId = this.get('job.workflow.id');
      let component = this;
      ajax({
        url: `${config.stand}/jobs/${jobId}/stop`,
        type: 'POST',
        data: {},
        beforeSend: function(request) {
          request.setRequestHeader('X-Auth-Token', '123456');
        },
      }).then(function(){Ember.getOwner(component).lookup('router:main').transitionTo('workflow.draw', workflowId);});
    },
  },
});
