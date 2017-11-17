/* global Set TahitiAttributeSuggester*/
import EmberObject, { set } from '@ember/object';
import $ from 'jquery';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import anchorPosition from 'lemonade-ember/utils/anchor-position';
import config from '../../config/environment';

export default Component.extend({
  store: service(),
  classNames: ['task', 'decor'],
  classNameBindings: ['task.operation.slug','status'],
  status: null,
  comment: null,
  isComment: false,
  dataSourceLoader(id, callback) {
    $.ajax({
      url: config.limonero + '/datasources/' + id,
      data: { attributes_name: true },
      success: function(response){
        callback(response.attributes.map(function(attr) {return attr.name}));
      },
      error: function() {
        callback(null);
        $("#flashNoDatasource").show().fadeIn().delay(2000).fadeOut('slow');
      }
    })
  },


  init() {
    this._super(...arguments);
    this.set('endpoints', A());

    let opId = String(this.get("task").operation.id);
    let operations = this.get('operations');

    if(this.get('readOnly') ){
      this.set('task.operation', operations.find(el => String(el.id) === opId));
    }
    this.set('operation', operations.find(el => String(el.id) === opId))

    /* Avoid self connections */
    this.get('jsplumb').bind('beforeDrop', (info) => {
      return info.sourceId !== info.targetId;
    });
    this.get('jsplumb').bind('connection', (info, originalEvent) => {
      if(originalEvent === undefined) {
        return;
      }

      let [id1, id2] = info.connection.getUuids().map((el) => el.split('/'));

      this.get('closeForms')();
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
    const el = $(`#${this.elementId}`);
    const jsplumb = this.get('jsplumb');
    const clickTask = this.get('clickTask');

    if(!task.name){
      set(task, 'name', op.get('name'));
    }

    el.css('top', task.top);
    el.css('left', task.left);

    let fn = function(a, b) { return a.order > b.order; };
    let input = op.get('ports').filter(p => p.type === 'INPUT').sort(fn);
    let output = op.get('ports').filter(p => p.type === 'OUTPUT').sort(fn);

    this.set('forms', op.get('forms'));

    task.forms = EmberObject.create(task.forms);
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
      $('#' + this.get('task').id + ' input').css('color',task.forms.get('color').value.foreground);
      el.css('background-color', task.forms.get('color').value.background);
      el.css('color', task.forms.get('color').value.foreground);
    }

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
          connectorHoverStyle:{ stroke:"red", strokeWidth: 2 },
          connectorStyle:{ stroke:"#373a3c", strokeWidth: 2 },
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

    if(!this.get('readOnly')) {
      jsplumb.draggable(el, {
        grid:[10,10],
        containment: true,
        stop: (ev) => {
          this.get('task').left = ev.pos[0];
          this.get('task').top  = ev.pos[1];
        }
      });
    }
    $(el).click((e) => {
      var component = this;
      var workflow = component.get('workflow').toJSON({ includeId: true });
      var dataSourceLoader = component.get('dataSourceLoader');
      var exec = component.get('forms').filter(el => el.category === 'execution')[0];
      var attr = exec ? exec.fields.filter((el) => {
        return el.suggested_widget === "attribute-selector" || el.suggested_widget === "attribute-function"
      }) : [];
      var callback = function(result){
        task.uiPorts = result[task.id].uiPorts;
        var aux = [];
        if( attr.length && task.uiPorts && task.uiPorts.inputs){
          for( var i=0; i < task.uiPorts.inputs.length; i++ ){
            aux = aux.concat(task.uiPorts.inputs[i].attributes)
          }
          for( i=0; i < attr.length; i++ ){
            set( attr[i], 'suggestedAttrs', [...new Set(aux)]);
          }
        }
        clickTask(component.get('forms'), task.forms, task);
      };
      TahitiAttributeSuggester.compute(workflow, dataSourceLoader, callback);

      $('#forms').toggle(e.target.id != 'testDelete');
      $('.ui-selected').removeClass('ui-selected');
      $(el).addClass('ui-selected');



    });
  },
  actions: {
    onDestroy() {
      this.get('endpoints').forEach(e => this.get('jsplumb').deleteEndpoint(e));
      this.get('removeTask')();
    }
  }
});
