import Component from '@ember/component';
import $ from 'jquery';
import { A } from '@ember/array';
import anchorPosition from 'citron/utils/anchor-position';
import { set } from '@ember/object'

export default Component.extend({
  classNameBindings: ['task.operation.slug', 'status'],
  status: null,
  isComment: false,

  init() {
    this._super(...arguments);
    this.set('task.endpoints', A());
  },

  didInsertElement() {
    const fn = function(a, b) { return a.order > b.order; };
    const el = this.$();
    const endpoints = this.get('task.endpoints');
    const task = this.get('task');
    let operation = this.get('operations').findBy('id', String(task.operation.id));

    set(task, 'operation', operation.toJSON({includeId: true}));
    set(task, 'operation.forms', task.operation.forms.sort(fn));
    this.set('isComment', task.operation.slug === 'comment');
    task.operation.forms.forEach((form) =>{
      form.fields.forEach((field) => {
        if (task.forms[field.name] === undefined || task.forms[field.name] === null) {
          if(field.default) {
            task.forms[field.name] = {value: field.default};
          } else {
            task.forms[field.name] = {value: ''};
          }
        }
      })
    });

    let input = operation.get('ports').filter(p => p.type === 'INPUT').sort(fn);
    let output = operation.get('ports').filter(p => p.type === 'OUTPUT').sort(fn);
    let isInput = true;

    el.css('top', task.top);
    el.css('left', task.left);
    if(task.forms.color.value){
      el.css('color', task.forms.color.value.background);
      el.css('background-color', task.forms.color.value.background);
    }


    [input, output].forEach((type) => {
      type.forEach((port, i) => {
        let interfaces = port.interfaces.map(el => el.name.toLocaleLowerCase()).join(" ");
        let opts = {
          isSource: !isInput,
          isTarget: isInput,
          scope: interfaces,
          cssClass: interfaces,
          anchors: anchorPosition(isInput, type.length, i),
          uuid: `${task.id}/${port.id}`,
          endpoint: [
            isInput ? "Dot" : "Rectangle", {
              radius: 7,
              width: 12,
              height: 12
            }
          ],
          overlays: [
            ["Label", {
              id: "label",
              label: port.name,
              location: isInput ? [0, -1] : [0, 2],
              cssClass: "label-overlay",
            }]
          ],
          maxConnections: port.multiplicity === "ONE" ? 1 : -1,
          dropOptions : { activeClass: isInput ? 'drag-input' : 'drag-output' },
          connectionType: interfaces,
          connectorClass: interfaces,
        };
        this.get('addEndpoint')(endpoints, el, opts)
      });
      isInput = false;
    });
    this.get('setDraggable')(el, task);

  },

  actions: {
    clickTask(){
      $('.ui-selectee').css('cursor', 'wait');
      $('.ui-selected').removeClass('ui-selected');
      $('#page-content-wrapper').css('cursor', 'wait');
      this.$().addClass('ui-selected');
      this.get('clickTask')(this.get('task'));
    },
    removeTask(){
      this.get('removeTask')(this.get('task'));
    },
  }
});
