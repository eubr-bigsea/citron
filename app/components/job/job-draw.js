/* global jsPlumb */
/* global Ps */

import Ember from 'ember';
import generateUUID from 'lemonade-ember/utils/generate-uuid';
import config from '../../config/environment';

const { inject:{ service } } = Ember;

export default Ember.Component.extend({
  classNames: ['diagram'],
  classNameBindings: ['status'],
  statusClasses: ['completed', 'error', 'canceled', 'interruped', 'pending', 'running', 'waiting'],
  status: null,

	store: service('store'),
	socketIOService: service('socket-io'),

  //socket-io config
	namespace: '/stand',
  path: { path: '/stand/socket.io' },

  onConnect() {
    const socket = this.get('socketIOService').socketFor(config.stand, this.get('path'));
    socket.emit('join', {room: this.get('jobId')});
  },
  onDisconnect(){
    console.debug('disconnected');
  },
  onConnectError(){
    console.debug('Web socket server offline');
  },
  onUpdateTask(message){
    var stepTemplate = $(`#${message.id}`);
    stepTemplate.removeClass(this.get('statusClasses').join(' '));
    var className = message.status.toLowerCase();
    stepTemplate.addClass(className);
  },
  onUpdateJob(message){
    var router = Ember.getOwner(this).lookup('router:main');
    this.set('status', message.status.toLowerCase());
    if( message.status === 'COMPLETED'){
      console.debug(message);
      router.transitionTo('job.result', this.get('jobId'));
    } else {
      console.debug(message);
    }
  },




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
    this.set('status', this.get('jobStatus').toLowerCase());
  },

  didInsertElement() {
    this._super(...arguments);

    var path = this.get('path');
    const socket = this.get('socketIOService').socketFor(config.stand, path);

    socket.on('connect', this.onConnect, this);
    socket.on('disconnect', this.onDisconnect, this);
    socket.on('connect_error', this.onConnectError, this);
    socket.on('update task', this.onUpdateTask, this);
    socket.on('update job', this.onUpdateJob, this);

    let el = this;

    Ps.initialize(document.getElementById(this.elementId));

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
    steps.forEach(function(step){
      var taskTemplate = $(`#${step.task.id}`);
      var className = step.status.toLowerCase();
      taskTemplate.addClass(className);
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.get('socketIOService').closeSocketFor(config.stand, this.get('path'));
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
