/* global jsPlumb */

import Ember from 'ember';
import generateUUID from 'lemonade-ember/utils/generate-uuid';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  elementId: "lemonade-diagram",
  classNames: ["lemonade", "col-xs-12"],
  zoomScale: 1,

  init() {
    this._super(...arguments);
    this.set('jsplumb', jsPlumb.getInstance({Container: this.elementId}));

    this.set('tasks', Ember.A());
    this.set('flows', Ember.A());

    this.get('workflow').get('tasks').forEach((task) => {
      this.get('tasks').addObject(task);
    });

    this.get('workflow').get('flows').forEach((flow) => {
      this.get('flows').addObject(flow);
    });
  },
  didInsertElement() {
    let el = this;

    Ember.$('#zoomIn').click(() => {
      this.triggerAction({
        action:'zoomIn',
        target: this
      });
    });

    Ember.$('#zoomOut').click(() => {
      this.triggerAction({
        action:'zoomOut',
        target: this
      });
    });

    Ember.$(`#${this.elementId}`).droppable({
      drop: (event, ui) => {
        let task = {
          id: generateUUID(),
          z_index: 0,
          forms: {},
          left: ui.position.left/this.get('zoomScale'),
          top: ui.position.top/this.get('zoomScale'),
          operation: {
            id: ui.helper.data('opid'),
            name: ui.helper.data('name'),
            slug: ui.helper.data('slug')
          },
          operation_id: ui.helper.data('opid')
        };
        this.get('workflow').get('tasks').addObject(task);
        this.get('tasks').addObject(task);
        this.get('hasChanged')(true);
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
    this.get('workflow').get('flows').forEach((flow) => {
      this.get('flows').addObject(flow);
      this.send('addFlow', flow);
    });
  },
  actions: {
    closeForms(){
      Ember.$('#forms').toggle(false);
      this.set('forms', Ember.Object.create());
      this.set('filledForms', Ember.Object.create());
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
      if(save) {
        this.get('workflow').get('flows').addObject(flow);
        this.get('flows').addObject(flow);
      } else {
        this.get('jsplumb').connect({
          uuids: [
            `${flow.source_id}/${flow.source_port}`,
            `${flow.target_id}/${flow.target_port}`
          ]
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
        Ember.$('#lemonade-diagram:not(button)').animate({ 'zoom': this.get('zoomScale') }, 400);
        this.get('jsplumb').setZoom(this.get('zoomScale'));
      }
    },

    zoomOut(){
      if(this.get('zoomScale') > 0.7){
        this.set('zoomScale', this.get('zoomScale') - 0.1);
        Ember.$('#lemonade-diagram').animate({ 'zoom': this.get('zoomScale') }, 400);
        this.get('jsplumb').setZoom(this.get('zoomScale'));
      }
    }
  }
});
