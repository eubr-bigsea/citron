import Component from '@ember/component';
// import Ps from '@perfect-scrollbar';
// import generateUUID from 'citron/utils/generate-uuid';
// import jsPlumb from '@jsplumb';
// import $ from 'jquery';
import { computed } from '@ember/object';
import joint from 'jointjs';

export default Component.extend({
  classNames: ['col-12'],
  classNameBindings: ['displayForm'],
  // zoomScale: 1,
  // zoomMax: computed('zoomScale', function() {
  //   return this.get('zoomScale') >= 1.4 ? 'disable' : 'enable';
  // }),
  // zoomMin: computed('zoomScale', function() {
  //   return this.get('zoomScale') <= 0.7 ? 'disable' : 'enable';
  // }),

  // init() {
  //   this._super(...arguments);
  // },

  didInsertElement() {
    const graph = this.get('graph');
    let paper = new joint.dia.Paper({
      el: this.$('#lemonade-diagram1'),
      model: graph,
      width: 5000,
      height: 5000,
      gridSize: 10,
      drawGrid: {
        name: 'doubleMesh',
        args: [{ color: '#e0e0e0', thickness: 1 }, { color: '#d1d1d1', thickness: 1, scaleFactor: 2 }]
      },
      validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
        debugger;
        // Prevent loop linking
        return magnetS !== magnetT;
      }
    });
    this.set('paper', paper);
    const workflow = this.get('workflow');
    workflow.tasks.forEach(task => {
      let elem = {
        inPorts: [],
        outPorts: [],
        attrs: {
          text: { text: 'name' }
        },
        position: {
          x: task.left,
          y: task.top
        },
        ports: {
          groups: {
            in: { position: 'top' },
            out: { position: 'bottom' }
          }
        }
      };
      var rect = new joint.shapes.devs.Model(elem);

      task.operation.ports.forEach(port => {
        let { id, slug, type, name, interfaces, multiplicity } = port;

        let opt = {
          id,
          attrs: {
            interfaces: interfaces.map(i => i.name.toLowerCase()),
            multiplicity: multiplicity == 'MANY' ? true : false
          }
        };
        if (type === 'INPUT') {
          rect.addInPort(name, port);
        } else if (type === 'OUTPUT') {
          rect.addOutPort(name, port);
        }
      });

      debugger;
      rect.position(task.left, task.top);
      rect.resize(120, 50);

      rect.attr({
        body: {
          fill: 'blue'
        },
        label: {
          text: task.name,
          fill: 'white'
        },
        id: task.id
      });
      rect.addTo(graph);
    });
  },

  actions: {
    // zoomIn() {
    //   let scale = this.get('zoomScale');
    //   if (scale < 1.4) {
    //     scale = scale + 0.1;
    //     $('#lemonade-diagram').animate({ zoom: scale }, 400);
    //     this.get('jsplumb').setZoom(scale);
    //     this.set('zoomScale', scale);
    //   }
    // },
    // zoomOut() {
    //   let scale = this.get('zoomScale');
    //   if (scale > 0.7) {
    //     scale = scale - 0.1;
    //     $('#lemonade-diagram').animate({ zoom: scale }, 400);
    //     this.get('jsplumb').setZoom(scale);
    //     this.set('zoomScale', scale);
    //   }
    // },
    // addFlow(flow) {
    //   this.get('workflow.flows').addObject(flow);
    //   this.set('hasChanged', true);
    // },
    // removeFlow(flow) {
    //   let flows = this.get('workflow.flows');
    //   const obj = flows.find(el => {
    //     return (
    //       el.source_id === flow.source_id &&
    //       el.source_port === flow.source_port &&
    //       el.target_id === flow.target_id &&
    //       el.target_port === flow.target_port
    //     );
    //   });
    //   flows.removeObject(obj);
    //   this.set('hasChanged', true);
    // },
    // addTask(data, position) {
    //   // loop to increment task name
    //   let index = 1;
    //   while (this.get('workflow.tasks').findBy('name', `${data.name} ${index}`)) {
    //     index++;
    //   }
    //   const name = `${data.name} ${index}`;
    //   let zoomScale = this.get('zoomScale');
    //   const operation = this.get('operations')
    //     .findBy('id', String(data.opid))
    //     .toJSON({ includeId: true });
    //   const task = {
    //     name,
    //     operation,
    //     id: generateUUID(),
    //     z_index: 0,
    //     forms: {},
    //     left: position.left / zoomScale,
    //     top: position.top / zoomScale,
    //     operation_id: data.opid
    //   };
    //   operation.forms.forEach(form => {
    //     form.fields.forEach(field => {
    //       if (task.forms[field.name] === undefined || task.forms[field.name] === null) {
    //         if (field.default) {
    //           task.forms[field.name] = { value: field.default };
    //         } else {
    //           task.forms[field.name] = { value: '' };
    //         }
    //       }
    //     });
    //   });
    //   this.get('workflow.tasks').addObject(task);
    //   this.set('hasChanged', true);
    // },
    // removeTask(task) {
    //   const flows = this.get('workflow.flows');
    //   const flowsToRemove = flows.filter(el => {
    //     return el.source_id === task.id || el.target_id === task.id;
    //   });
    //   task.endpoints.forEach(e => this.get('jsplumb').deleteEndpoint(e));
    //   flows.removeObjects(flowsToRemove);
    //   this.get('workflow.tasks').removeObject(task);
    //   this.set('selectedTask', null);
    //   this.set('displayForm', null);
    //   this.set('hasChanged', true);
    // },
    // setDraggable(el, task) {
    //   this.get('jsplumb').draggable(el, {
    //     grid: [10, 10],
    //     containment: true,
    //     stop: ev => {
    //       this.set('hasChanged', true);
    //       task.left = ev.pos[0];
    //       task.top = ev.pos[1];
    //     }
    //   });
    // },
    // addEndpoint(endpoints, el, opts) {
    //   this.get('jsplumb').addEndpoint(el, opts);
    //   endpoints.addObject(opts.uuid);
    // }
  }
});
