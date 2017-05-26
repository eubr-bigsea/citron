import Ember from 'ember';
import anchorPosition from 'lemonade-ember/utils/anchor-position';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['task', 'decor'],
  classNameBindings: ['task.operation.slug','status'],
  status: null,
  comment: null,
  isComment: false,

  init() {
    this._super(...arguments);
    this.set('endpoints', Ember.A());

    let opId = String(this.get("task").operation.id);
    let operations = this.get('operations');

    if(this.get('readOnly') ){
      this.set('task.operation', operations.find(el => String(el.id) === opId));
    }
    this.set('operation', operations.find(el => String(el.id) === opId))
    this.get('jsplumb').bind('connection', (info, originalEvent) => {
      if(originalEvent === undefined) {
        return;
      }

      let [id1, id2] = info.connection.getUuids().map((el) => el.split('/'));

      this.get('addFlow')({
        source_id: id1[0],
        source_port: Number(id1[1]),
        target_id: id2[0],
        target_port: Number(id2[1])
      }, true);

      return false;
    });

    this.get('jsplumb').bind('connectionMoved', (info, originalEvent) => {
      if(originalEvent === undefined) {
        return;
      }

      let originalSource = info.originalSourceEndpoint.getUuid().split('/');
      let originalTarget = info.originalTargetEndpoint.getUuid().split('/');

      this.get('removeFlow')({
        source_id: originalSource[0],
        source_port: Number(originalSource[1]),
        target_id: originalTarget[0],
        target_port: Number(originalTarget[1])
      });

      return false;
    });

    this.get('jsplumb').bind('connectionDetached', (info, originalEvent) => {
      if(originalEvent === undefined) {
        return;
      }

      let [id1, id2] = info.connection.getUuids().map((el) => el.split('/'));

      this.get('removeFlow')({
        source_id: id1[0],
        source_port: Number(id1[1]),
        target_id: id2[0],
        target_port: Number(id2[1])
      });

      return false;
    });
    this.set('isComment', (this.get('operation.slug') === 'comment'));
  },

  didInsertElement() {
    const task = this.get('task');
    const op   = this.get('operation');
    const el = Ember.$(`#${this.elementId}`);
    const jsplumb = this.get('jsplumb');
    const clickTask = this.get('clickTask');

    el.css('top', task.top);
    el.css('left', task.left);

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
    this.set('comment', task.forms.comment.value);

    if(!this.get('readOnly') ){
      el.css('background-color', task.forms.get('color').value.background);
      el.css('color', task.forms.get('color').value.foreground);
    }

    let isInput = true;
    [input, output].forEach((type) => {
      type.forEach((port, i) => {
        let uuid = `${this.get('elementId')}/${port.id}`;
        let coordinates;
        if (isInput) {
          coordinates = [0, -2];
        } else{
          coordinates = [0, 3];
        }
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
          overlays: [
            [
              "Label", {
                label:port.name,
                id: "id",
                location:coordinates,
                cssClass: "jsPlumbText",
              }
            ]
          ],
          connector: 'Flowchart',
          connectorOverlays: [
            [
              "Arrow", {
                location: 0.75,
                length: 15,
                foldback: 0.8
              }
            ],
          ],
          maxConnections: -1,
        };
        this.get('endpoints').addObject(jsplumb.addEndpoint(el, opts));
      });
      isInput = false;
    });

    if(!this.get('readOnly')) {
      jsplumb.draggable(el, {
        containment: true,
        stop: (ev) => {
          this.get('task').left = ev.pos[0];
          this.get('task').top  = ev.pos[1];
        }
      });
    }

    Ember.$(el).click((e) => {
      Ember.$('#forms').toggle(e.target.id != 'testDelete');
      Ember.$('.ui-selected').removeClass('ui-selected');
      Ember.$(el).addClass('ui-selected');

      let exec = this.get('forms').filter(el => el.category === 'execution')[0];

      let attr = exec ? exec.fields.filter((el) => {
        return el.suggested_widget === "attribute-selector"
      }) : [];

      attr.forEach((el) => {
        //TODO add attribute suggestions
        el.values = JSON.stringify(["field1", "field2", "field3"]);
      });

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
