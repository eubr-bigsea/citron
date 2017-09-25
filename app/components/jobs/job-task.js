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

    this.set('operation', operations.find(el => String(el.id) === opId))
  },

  didInsertElement() {
    const task = this.get('task');
    const op   = this.get('operation');
    const el = Ember.$(`#${this.elementId}`);
    const jsplumb = this.get('jsplumb');

    el.css('top', task.top);
    el.css('left', task.left);

    let fn = function(a, b) { return a.order > b.order; };
    let input = op.get('ports').filter(p => p.type === 'INPUT').sort(fn);
    let output = op.get('ports').filter(p => p.type === 'OUTPUT').sort(fn);

    this.set('comment', task.forms.comment.value);

    let isInput = true;
    [input, output].forEach((type) => {
      type.forEach((port, i) => {
        let opts = {
          isSource: !isInput,
          isTarget: isInput,
          scope: port.interfaces.map(el => el.name).join(" "),
          anchors: anchorPosition(isInput, type.length, i),
          uuid: `${this.get('elementId')}/${port.id}`,
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
                label: port.name,
                id: "id",
                location: isInput ? [0, -2] : [0, 3],
                cssClass: "label-overlay",
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
          maxConnections: port.multiplicity === "ONE" ? 1 : -1,
          dropOptions : {
            activeClass: isInput ? 'drag-input' : 'drag-output',
          },
        };
        this.get('endpoints').addObject(jsplumb.addEndpoint(el, opts));
      });
      isInput = false;
    });

    jsplumb.draggable(el, false);

    Ember.$(el).dblclick(() => {
      var modal = {
        target: el.attr('id'),
      };
      this.set('modalContent', modal);
      this.set('modal', true);
    });
  },
  actions: {
    submit(){
    },
  }
});
