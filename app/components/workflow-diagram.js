/* global jsPlumb */

import Ember from 'ember';
import generateUUID from 'lemonade-ember/utils/generate-uuid';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  tasks: [],
  flows: [],
  init() {
    this._super(...arguments);
    this.set('jsplumb', jsPlumb.getInstance({Container: this.elementId}));

    this.get('workflow').get('tasks').forEach((task) => {
      this.get('tasks').addObject(task);
    });

    this.get('workflow').get('flows').forEach((flow) => {
      this.get('flows').addObject(flow);
    });
  },
  didInsertElement() {
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
        this.get('workflow').save();
      }
    }).selectable({
      selected() {
        Ember.$('.ui-selected').removeClass('ui-selected');
      },
      stop() {
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
    clickTask(forms, filledForms, task) {
      let fn = function(a, b) { return a.order > b.order; };
      this.set('forms', forms.sort(fn));
      this.set('filledForms', filledForms);
      this.set('task', task);
    },
    saveTasks() {
      this.get('workflow').save();
    },
    removeTask(task) {
      let toRemove = this.get('workflow').get('flows').filter((el) => {
        return el.source_id === task.id || el.target_id === task.id;
      });
      this.get('workflow').get('tasks').removeObject(task);
      this.get('workflow').get('flows').removeObjects(toRemove);
      this.get('tasks').removeObject(task);
      this.get('flows').removeObjects(toRemove);
      this.get('workflow').save();
    },
    addFlow(flow, save = false) {
      this.get('jsplumb').connect({
        uuids: [
          `${flow.source_id}/${flow.source_port}`,
          `${flow.target_id}/${flow.target_port}`
        ]
      });
      if(save) {
        this.get('workflow').get('flows').addObject(flow);
        this.get('flows').addObject(flow);
        this.get('workflow').save();
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
      this.get('workflow').save();
    },
  }
});
