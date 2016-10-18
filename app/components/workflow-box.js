import Ember from 'ember';

const anchors = {
  "INPUT": [
    [ [0.5, 0, 0, -1] ],
    [ [0.2, 0, 0, -1], [0.8, 0, 0, -1] ],
    [ [0.2, 0, 0, -1], [0.5, 0, 0, -1], [0.8, 0, 0, -1] ]
  ],
  "OUTPUT": [
    [ [0.5, 1, 0, 1] ],
    [ [0.2, 1, 0, 1], [0.8, 1, 0, 1] ],
    [ [0.2, 1, 0, 1], [0.5, 1, 0, 1], [0.8, 1, 0, 1] ]
  ]
};

export default Ember.Component.extend({
  store: Ember.inject.service(),
  classNames: ['box'],
  init() {
    this._super(...arguments);

    let el = this.elementId;
    let jsplumb = this.get('jsplumb');

    this.set('endpoints', Ember.A());

    this.get('store').findRecord('operation', this.get('box').opid).then(op => {
      this.set('operation', op);

      const input = op.get('ports').filter(p => p.type === "INPUT");
      const output = op.get('ports').filter(p => p.type === "OUTPUT");

      [input, output].forEach(type => {
        type.forEach((port, i) => {
          let opts = {
            isSource: port.type === "OUTPUT",
            isTarget: port.type === "INPUT",
            anchors: anchors[port.type][type.length - 1][i]
          };
          this.get('endpoints').addObject(jsplumb.addEndpoint(el, opts));
        });
      });
    });
  },
  didInsertElement() {
    const el = Ember.$(`#${this.elementId}`);
    const jsplumb = this.get('jsplumb');

    el.css(this.get('box').position);


    jsplumb.draggable(el, {containment: true});
  },
  actions: {
    onDestroy() {
      this.get('endpoints').forEach(e => this.get('jsplumb').deleteEndpoint(e));
      this.get('removeBox')();
    }
  }
});
