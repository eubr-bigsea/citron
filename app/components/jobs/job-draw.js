/* global jsPlumb */
import Ember from 'ember';
import generateUUID from 'lemonade-ember/utils/generate-uuid';
import config from '../../config/environment';
import io from 'npm:socket.io-client';

const { inject:{ service } } = Ember;

export default Ember.Component.extend({
  statusClasses: ['completed', 'error', 'canceled', 'interruped', 'pending', 'running', 'waiting'],

  store: service('store'),

  init() {
    this._super(...arguments);

    this.set('jsplumb', jsPlumb.getInstance({Container: this.elementId}));

    this.set('tasks', Ember.A());
    this.set('flows', Ember.A());

    this.get('workflow').tasks.forEach((task) => {
      this.get('tasks').addObject(task);
    });

    this.get('workflow').flows.forEach((flow) => {
      this.get('flows').addObject(flow);
    });

    this.set('socket', io(config.webSocketIO.url + config.webSocketIO.namespace, { path:config.webSocketIO.path }, {upgrade: true}));
    this.set('jobId', this.get('job.id'));
  },

  didReceiveAttrs(){
    //Socket-io client
    var socket = this.get('socket');
    var component = this;

    socket.on('connect', () => {
      socket.emit('join', {room: this.get('jobId')});
    });
    socket.on('connect_error', () => {
      console.debug('Web socket server offline');
    });
    socket.on('disconnect', () => {
      console.debug('disconnect');
    });
    socket.on('update task', function(frame) {
      var step = component.get('steps').findBy('task.id', frame.id);
      var logStep = component.get('stepsLogs').findBy('task.id', frame.id);
      logStep.logs.pushObject(frame);
      var stepTemplate = $(`#${step.task.id}`);
      stepTemplate.removeClass(component.get('statusClasses').join(' '));
      var className = frame.status.toLowerCase();
      stepTemplate.addClass(className);
    });

    socket.on('update job', function(frame) {
      console.debug('update job');
      component.set('job.status', frame.status.toLowerCase());
    });
  },

  didInsertElement() {
    this._super(...arguments);

    let el = this;

    Ember.$(`#${this.elementId}`).droppable({
      drop: (event, ui) => {
        let task = {
          id: generateUUID(),
          z_index: 0,
          forms: {},
          left: ui.position.left,
          top: ui.position.top,
          operation: {
            id: ui.helper.data('opid'),
            name: ui.helper.data('name'),
            slug: ui.helper.data('slug')
          },
          operation_id: ui.helper.data('opid')
        };
        this.get('workflow').get('tasks').addObject(task);
        this.get('tasks').addObject(task);
      }
    }).selectable({
      selected() {
        Ember.$('.ui-selected').removeClass('ui-selected');
      },
      stop() {
        Ember.$('#forms').toggle(false);
        el.set('forms', Ember.Object.create());
        el.set('filledForms', Ember.Object.create());
      }
    });
    this.get('workflow').flows.forEach((flow) => {
      this.get('flows').addObject(flow);
      this.send('addFlow', flow);
    });
  },

  didRender(){
    var steps = this.get('steps');
    var component = this;

    steps.forEach(function(step){
      var stepTemplate = $(`#${step.task.id}`);
      stepTemplate.removeClass(component.get('statusClasses').join(' '));
      var className = step.status.toLowerCase();
      stepTemplate.addClass(className);
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    var socket = this.get('socket');
    socket.emit('leave', { room: this.get('jobId') });
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
