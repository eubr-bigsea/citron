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
    selectTask(task, tab) {
      const self = this;
      const url =  `${config.caipirinha}/visualizations/${this.get('job.id')}/${task.id}`;

      if(task.result && task.result.type.toLowerCase() === 'visualization' && !task.result.data) {
        $.get({
          url: url,
          beforeSend(request) {
            request.setRequestHeader('X-Auth-Token', '123456');
          },
          success(data)  {
            if(data.mode && data.mode.polygon && data.geojson && data.geojson.url) {
              data.geojsonProperty = data.geojson.idProperty;
              // stash
              const headers = $.ajaxSettings.headers;
              for(const header in headers) { delete $.ajaxSettings.headers[header]; }
              delete $.ajaxSettings.headers.Locale;

              $.get({
                url: data.geojson.url,
                beforeSend(request) {
                  request.setRequestHeader('X-Auth-Token', '123456');
                },
                success(geojson) {
                  data.geojson = geojson;

                  data.geojson.features.forEach((feature, idx) => {
                    if(feature.geometry && feature.geometry.type.toLowerCase() === 'linestring') {
                      const coordinates = feature.geometry.coordinates;
                      feature.geometry.coordinates = [];

                      feature.geometry.type = 'Polygon';
                      feature.geometry.coordinates.push(coordinates);

                      data.geojson.features[idx] = feature;
                    }
                  });

                  task.result.data = data;
                  self.set('selectedTask', task);
                  //self.set('activeTab', tab);
                  self.set('activeTab', 'results');
                  self.set('taskModal', true);
                },
                error(err) {
                  console.log(err);
                  throw err;
                },
              });

              // restore
              $.ajaxSettings.headers = headers;
            }

            else {
              task.result.data = data;
              self.set('selectedTask', task);
              //self.set('activeTab', tab);
              self.set('activeTab', 'results');
              self.set('taskModal', true);
            }
          },
          error(err) { throw(err); }
        });
      }

      else {
        self.set('selectedTask', task);
        self.set('activeTab', tab);
        self.set('taskModal', true);
      }
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
            run(() => {
              if(response.source){
                var lang = eval(`Prism.languages.${response.lang}`);
                var highlighted = Prism.highlight(response.source, lang)
                this.set('code', highlighted);
                this.set('codeModal', true);
              } else {
                this.set('code', 'NONE');
                this.set('codeModal', true);
              }
            })
          },
          (error) => {
            run(() => {
              console.log('ERROR', error);
              this.set('codeModal', false);
            })
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
