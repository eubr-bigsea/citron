import $ from 'jquery';
import { A } from '@ember/array';
import Component from '@ember/component';
import anchorPosition from 'citron/utils/anchor-position';

export default Component.extend({
  classNameBindings: ['task.operation.slug','status'],
  endpoints: A(),

  didInsertElement() {
    const task = this.get('task');
    const el = this.$();
    const jsplumb = this.get('jsplumb');

    el.css('top', task.top);
    el.css('left', task.left);

    let fn = function(a, b) { return a.order > b.order; };
    let input = task.operation.ports.filter(p => p.type === 'INPUT').sort(fn);
    let output = task.operation.ports.filter(p => p.type === 'OUTPUT').sort(fn);

    let isInput = true;
    [input, output].forEach((type) => {
      type.forEach((port, i) => {
        let opts = {
          isSource: !isInput,
          isTarget: isInput,
          scope: port.interfaces.map(el => el.name).join(" "),
          anchors: anchorPosition(isInput, type.length, i),
          uuid: `${task.id}/${port.id}`,
          endpoint: [ isInput ? "Dot" : "Rectangle", { radius: 7, width: 12, height: 12 } ],
          maxConnections: port.multiplicity === "ONE" ? 1 : -1,
        };
        this.get('endpoints').addObject(jsplumb.addEndpoint(el, opts));
      });
      isInput = false;
    });

    jsplumb.setDraggable(el, false);
    var tab = 'logs';
    if(task.result){
      tab = 'results';
    }

    $(el).dblclick(() => { this.get('selectTask')(task, tab); });
  },
});
