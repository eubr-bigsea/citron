/* global jsPlumb */

import EmberObject from '@ember/object';

import $ from 'jquery';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import generateUUID from 'lemonade-ember/utils/generate-uuid';

export default Component.extend({
  store: service(),
  elementId: "lemonade-diagram",
  classNames: ["lemonade", "col-xs-12"],
  zoomScale: 1,

  init() {
    this._super(...arguments);
    this.set('jsplumb', jsPlumb.getInstance({Container: this.elementId}));

    this.set('tasks', A());
    this.set('flows', A());

    this.get('workflow').get('tasks').forEach((task) => {
      this.get('tasks').addObject(task);
    });

    this.get('workflow').get('flows').forEach((flow) => {
      this.get('flows').addObject(flow);
    });
  },

  getTaskName(name, tasks){
    var index = 1;
    while(tasks.findBy('name', `${name} ${index}`)){
      index++;
    }
    return `${name} ${index}`;
  },

  didInsertElement() {
    let el = this;
    let tasks = this.get('tasks');

    $('#zoomIn').click(() => {
      this.triggerAction({
        action:'zoomIn',
        target: this
      });
    });

    $('#zoomOut').click(() => {
      this.triggerAction({
        action:'zoomOut',
        target: this
      });
    });

    $(`#${this.elementId}`).droppable({
      drop: (event, ui) => {
        let data = ui.helper.data();
        let task = {
          id: generateUUID(),
          z_index: 0,
          name: el.get('getTaskName')( data.name, tasks) ,
          forms: {},
          left: ui.position.left/this.get('zoomScale'),
          top: ui.position.top/this.get('zoomScale'),
          operation: {
            id: data.opid,
            name: data.name,
            slug: data.slug
          },
          operation_id: data.opid
        };
        console.log('drop', task);
        this.get('workflow').get('tasks').addObject(task);
        this.get('tasks').addObject(task);
        this.get('hasChanged')(true);
      }
    }).selectable({
      cancel: "a,.cancel,span,.cancel",
      selected() {
        $('.ui-selected').removeClass('ui-selected');
      },
      stop() {
        $('#forms').toggle(false);
        el.set('forms', EmberObject.create());
        el.set('filledForms', EmberObject.create());
      }
    });
    this.get('workflow').get('flows').forEach((flow) => {
      this.get('flows').addObject(flow);
      this.send('addFlow', flow);
    });
  },
  actions: {
    closeForms(){
      $('#forms').toggle(false);
      this.set('forms', EmberObject.create());
      this.set('filledForms', EmberObject.create());
    },
    clickTask(forms, filledForms, task) {
      let fn = function(a, b) { return a.order > b.order; };
      this.set('forms', forms.sort(fn));
      this.set('filledForms', filledForms);
      this.set('task', task);
    },
    removeTask(task) {
      let toRemove = this.get('workflow').get('flows').filter((el) => {
        return el.source_id === task.id || el.target_id === task.id;
      });
      this.get('workflow').get('tasks').removeObject(task);
      this.get('workflow').get('flows').removeObjects(toRemove);
      this.get('tasks').removeObject(task);
      this.get('flows').removeObjects(toRemove);
      this.get('hasChanged')(true);
    },
    addFlow(flow, save = false) {
      var closeId = null;
      let jsplumb = this.get('jsplumb');

      if(save) {
        this.get('workflow').get('flows').addObject(flow);
        this.get('flows').addObject(flow);
      } else {
        var connection = this.get('jsplumb').connect({
          hoverPaintStyle:{ stroke:"red", strokeWidth: 2 },
          paintStyle:{ stroke:"#373a3c", strokeWidth: 2 },
          overlays: [
            [
              "Custom", {
                cssClass: "conn-close-btn label-overlay conn-delete-btn btn btn-primary btn-md",
                create:function(component) {
                  closeId = component.getId();
                  var el =  $('<a rel="tooltip" href="#" id="' + component.getId() + '"><i class="fa fa-times fa-lg"></i></a>');
                  return el;
                },
                location: 0.5,
                id:"customOverlay",
              }
            ]
          ],

          uuids: [
            `${flow.source_id}/${flow.source_port}`,
            `${flow.target_id}/${flow.target_port}`
          ]
        });
        $('#' + closeId).click(() =>{
          let [id1, id2] = connection.getUuids().map((el) => el.split('/'));
          let flow = {
            source_id: id1[0],
            source_port: Number(id1[1]),
            target_id: id2[0],
            target_port: Number(id2[1])
          };

          this.send('removeFlow', flow);
          jsplumb.detach(connection);
        });
      }
    },
    removeFlow(flow) {
      let obj = this.get('workflow').get('flows').find((el) => {
        return (
          el.source_id   === flow.source_id   &&
          el.source_port === flow.source_port &&
          el.target_id   === flow.target_id   &&
          el.target_port === flow.target_port
        );
      });

      this.get('workflow').get('flows').removeObject(obj);
      this.get('flows').removeObject(obj);
    },
    zoomIn(){
      if(this.get('zoomScale') < 1.4){
        this.set('zoomScale', this.get('zoomScale') + 0.1);
        $('#lemonade-diagram:not(button)').animate({ 'zoom': this.get('zoomScale') }, 400);
        this.get('jsplumb').setZoom(this.get('zoomScale'));
      }
    },

    zoomOut(){
      if(this.get('zoomScale') > 0.7){
        this.set('zoomScale', this.get('zoomScale') - 0.1);
        $('#lemonade-diagram').animate({ 'zoom': this.get('zoomScale') }, 400);
        this.get('jsplumb').setZoom(this.get('zoomScale'));
      }
    }
  }
});
