/* global jsPlumb */
import EmberObject, { set } from '@ember/object';

import $ from 'jquery';
import { A } from '@ember/array';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import generateUUID from 'lemonade-ember/utils/generate-uuid';
import config from '../../config/environment';
import io from 'npm:socket.io-client';

export default Component.extend({
  classNameBindings: ['status'],
  statusClasses: ['completed', 'error', 'canceled', 'interruped', 'pending', 'running', 'waiting'],

  store: service('store'),

  init() {
    this._super(...arguments);
    this.set('socket', io(config.webSocketIO.url + config.webSocketIO.namespace, { path:config.webSocketIO.path }, {upgrade: true}));
    this.set('jsplumb', jsPlumb.getInstance({Container: this.elementId, draggable: false}));
  },

  didInsertElement() {
    //Draw flow
    this.get('workflow').flows.forEach((flow) => {
      this.send('addFlow', flow);
    });

    //Socket-io client
    var socket = this.get('socket');
    let jobId = this.get('job.id');
    var component = this;

    socket.on('connect', () => {
      socket.emit('join', {room: jobId});
    });
    socket.on('connect_error', () => {
      console.debug('Web socket server offline');
    });
    socket.on('disconnect', () => {
      console.debug('disconnect');
    });
    socket.on('update task', function(frame, server_callback) {
      var step = component.get('steps').findBy('task.id', frame.id);
      component.get('generateLogs')(step.operation.name, frame.message);
      var logStep = component.get('stepsLogs').findBy('task.id', frame.id);
      logStep.logs.pushObject(frame);
      set(logStep, 'status', frame.status);
      var stepTemplate = $(`#${step.task.id}`);
      stepTemplate.removeClass(component.get('statusClasses').join(' '));
      var className = frame.status.toLowerCase();
      stepTemplate.addClass(className);
      if (server_callback){
        server_callback();
      }
    });

    socket.on('update job', function(frame, server_callback) {
      console.debug('update job');
      component.set('job.status', frame.status.toLowerCase());
      if(frame.status.toLowerCase() === 'error'){
        $("#flashError").text(frame.message).show()
        var job = component.get('job');
        set(job, 'status_text', frame.message);
      }
      if (server_callback){
        server_callback();
      }
    });
  },


  didRender(){
    var steps = this.get('steps');

    steps.forEach(function(step){
      var stepTemplate = $(`#${step.task.id}`);
      var className = step.status.toLowerCase();
      if(!(className == "pending" && (stepTemplate.hasClass("completed") || stepTemplate.hasClass("canceled") || stepTemplate.hasClass("error") || stepTemplate.hasClass("interrupted")))){
        stepTemplate.addClass(className);
      }
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    var socket = this.get('socket');
    let jobId = this.get('job.id');
    socket.emit('leave', { room: jobId });
    socket.emit('disconnect');
    socket.close();
  },

  actions: {
    clickTask(forms, filledForms, task) {
      let fn = function(a, b) { return a.order > b.order; };
      this.set('forms', forms.sort(fn));
      this.set('filledForms', filledForms);
      this.set('task', task);
    },
    addFlow(flow) {
      this.get('jsplumb').connect({
        detachable: false,
        uuids: [
          `${flow.source_id}/${flow.source_port}`,
          `${flow.target_id}/${flow.target_port}`
        ]
      });
    },
    removeFlow() {},
    removeTask() {}
  }
});
