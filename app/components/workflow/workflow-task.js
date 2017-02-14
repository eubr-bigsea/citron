import Ember from 'ember';
import anchorPosition from 'lemonade-ember/utils/anchor-position';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['task'],
  init() {
    this._super(...arguments);
    this.set('endpoints', Ember.A());
  },
  didInsertElement() {
    const task = this.get('task');
    const el = Ember.$(`#${this.elementId}`);
    const jsplumb = this.get('jsplumb');
    const clickTask = this.get('clickTask');

    el.css('top', task.top);
    el.css('left', task.left);

    Ember.run(() => {
      this.get('store').findRecord('operation', task.operation.id, {backgroundReload: false}).then(op => {
        let fn = function(a, b) { return a.order > b.order; };
        let input = op.get('ports').filter(p => p.type === 'INPUT').sort(fn);
        let output = op.get('ports').filter(p => p.type === 'OUTPUT').sort(fn);

        this.set('forms', op.get('forms'));

        task.forms = Ember.Object.create(task.forms);
        op.get('forms').forEach((el) => {
          el.fields.forEach((field) => {
            if(task.forms.get(field.name) === undefined ||
              task.forms.get(field.name).value === undefined) {
              task.forms.set(field.name, {value: field.default});
            }
          });
        });

        el.css('background-color', task.forms.get('color').value);

        let isInput = true;
        [input, output].forEach((type) => {
          type.forEach((port, i) => {
            let uuid = `${this.get('elementId')}/${port.id}`;
            let opts = {
              isSource: !isInput,
              isTarget: isInput,
              anchors: anchorPosition(isInput, type.length, i),
              uuid: uuid,
              endpoint: [
                isInput ? "Dot" : "Rectangle", {
                  radius: 5,
                  width: 10,
                  height: 10
                }
              ],
              connector: 'Flowchart',
              connectorOverlays: [
                [
                  "Arrow", {
                    location: 0.75,
                    length: 15,
                    foldback: 0.8
                  }
                ]
              ],
              maxConnections: -1,
              beforeDetach: (params) => {
                let id1 = params.endpoints[0].getUuid().split('/');
                let id2 = params.endpoints[1].getUuid().split('/');

                this.get('removeFlow')({
                  source_id: id1[0],
                  source_port: Number(id1[1]),
                  target_id: id2[0],
                  target_port: Number(id2[1])
                });
                return true;
              },
              beforeDrop: (params) => {
                let id1 = params.connection.getUuids()[0].split('/');
                let id2 = uuid.split('/');
                this.get('addFlow')({
                  source_id: id1[0],
                  source_port: Number(id1[1]),
                  target_id: id2[0],
                  target_port: Number(id2[1])
                }, true);
              }
            };
            this.get('endpoints').addObject(jsplumb.addEndpoint(el, opts));
          });
          isInput = false;
        });
      });
    });

    jsplumb.draggable(el, {
      containment: true,
      stop: (ev) => {
        this.get('task').left = ev.pos[0];
        this.get('task').top  = ev.pos[1];
      }
    });


    Ember.$(el).click(() => {
      Ember.$('#forms').toggle(true);
      $('#forms').toggle(true);

      Ember.$('.ui-selected').removeClass('ui-selected');
      Ember.$(el).addClass('ui-selected');
      clickTask(this.get('forms'), task.forms, task);
    });
  },
  actions: {
    onDestroy() {
      this.get('endpoints').forEach(e => this.get('jsplumb').deleteEndpoint(e));
      this.get('removeTask')();
    }
  }
});
