import Component from '@ember/component';
import Ps from '@perfect-scrollbar';
import generateUUID from 'lemonade-ember/utils/generate-uuid';
import jsPlumb from '@jsplumb';
import $ from 'jquery';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ["col-xs-12"],
  zoomScale: 1,
  zoomMax: computed('zoomScale', function(){ return this.get('zoomScale') >= 1.4 ? 'deactive' : 'active' }),
  zoomMin: computed('zoomScale', function(){ return this.get('zoomScale') <= 0.7 ? 'deactive' : 'active' }),


  init(){
    this._super(...arguments);
    jsPlumb.importDefaults({
      Connector: 'Flowchart',
      ConnectionOverlays: [ ["Arrow", {} ] ],
      Overlays: [
        ["Custom", {
          id:'closeButton',
          cssClass: "close",
          create: () => {
            return $("<a title='remove' href='#'><i class='fa fa-times fa-lg'></i></a>");
          },
        }]
      ],
    });
    this.set('jsplumb', jsPlumb.getInstance({Container: "lemonade-diagram"}));

  },

  didInsertElement() {
    // bind DOM settings
    new Ps("#lemonade-container");
    const jsplumb = this.get('jsplumb');

    // handle connection event
    jsplumb.bind('connection', (info, originalEvent) => {
      const connection = info.connection;
      const closeBtn = $(connection.getOverlay('closeButton').canvas); // element in DOM
      const [id1, id2] = connection.getUuids().map((el) => el.split('/'));
      const flow = {
        source_id: id1[0],
        source_port: Number(id1[1]),
        target_id: id2[0],
        target_port: Number(id2[1])
      };

      // set position and show the 'X' to remove connection
      connection.bind("mouseover", (conn, event) => {
        const max_top = $(event.path[1]).height() + $(event.path[1]).position().top - 10;
        const min_top = $(event.path[1]).position().top + 10;
        if( event.clientY <= max_top &&  event.clientY >=  min_top ){
          closeBtn.css({left: event.clientX, top: event.clientY, display: 'block' });
        }
      });
      // Style svg path with alert color
      closeBtn.bind('mouseover', () => {
        $(connection.canvas).children().addClass('alert')
      });
      // style svg path back to normal and hide 'X'
      closeBtn.bind('mouseout', () => {
        $(connection.canvas).children().removeClass('alert')
        closeBtn.css({display: 'none'});
      });
      // remove connect on click
      closeBtn.bind('click', () => {
        jsplumb.deleteConnection(connection);
      });

      // originalEvent !== undefined implies to also add flow into array of
      // flows in workflow. Flow created by user, not loaded by workflow
      // also, needs to request attributes from tahiti
      if( originalEvent !== undefined ){
        this.send('addFlow', flow)
        this.get('getAttributeSuggestions')();
      }

      return;
    });

    //remove connection from flows
    jsplumb.bind('connectionMoved', (info) => {
      let originalSource = info.originalSourceEndpoint.getUuid().split('/');
      let originalTarget = info.originalTargetEndpoint.getUuid().split('/');

      this.send('removeFlow', {
        source_id: originalSource[0],
        source_port: Number(originalSource[1]),
        target_id: originalTarget[0],
        target_port: Number(originalTarget[1])
      });
      return false;
    });

    // Other way to remove connection by dragging and release on diagram
    jsplumb.bind('connectionDetached', (info) => {
      let [id1, id2] = info.connection.getUuids().map((el) => el.split('/'));

      this.send('removeFlow', {
        source_id: id1[0],
        source_port: Number(id1[1]),
        target_id: id2[0],
        target_port: Number(id2[1])
      });

      this.get('getAttributeSuggestions')();
      return false;
    });
    // Avoid self connections
    this.get('jsplumb').bind('beforeDrop', (info) => {
      return info.sourceId !== info.targetId;
    });

    // creates task at drop in diagram
    const drop = (event, ui) => {
      const data = ui.helper.data();
      const position = ui.position;
      this.send('addTask', data, position);
    };

    // handle single-click to close forms
    const start = () => {
      this.get('closeForms')();
    };

    // apply jqery UI settings
    this.$('#lemonade-diagram').droppable({ drop }).selectable({
      start,
      cancel: "a,.cancel,svg",
    });

    // draw the flows of loaded workflow
    this.get('workflow.flows').forEach((flow) => {
      jsplumb.connect({ uuids: [
        `${flow.source_id}/${flow.source_port}`,
        `${flow.target_id}/${flow.target_port}`
      ] });
    })
  },

  actions: {
    zoomIn(){
      let scale = this.get('zoomScale');

      if(scale < 1.4){
        scale = scale + 0.1;
        $('#lemonade-diagram').animate({ 'zoom': scale }, 400);
        this.get('jsplumb').setZoom(scale);
        this.set('zoomScale', scale);
      }
    },

    zoomOut(){
      let scale = this.get('zoomScale');

      if(scale > 0.7){
        scale = scale - 0.1
        $('#lemonade-diagram').animate({ 'zoom': scale }, 400);
        this.get('jsplumb').setZoom(scale);
        this.set('zoomScale', scale);
      }
    },

    addFlow(flow) {
      this.get('workflow.flows').addObject(flow);
      this.set('hasChanged', true);
    },

    removeFlow(flow) {
      let flows = this.get('workflow.flows');
      const obj = flows.find((el) => {
        return (
          el.source_id   === flow.source_id   &&
          el.source_port === flow.source_port &&
          el.target_id   === flow.target_id   &&
          el.target_port === flow.target_port
        );
      });

      flows.removeObject(obj);
      this.set('hasChanged', true);
    },

    addTask(data, position){
      // loop to increment task name
      let index = 1;
      while(this.get('workflow.tasks').findBy('name', `${data.name} ${index}`)){ index++; }
      const name = `${data.name} ${index}`;
      let zoomScale = this.get('zoomScale');
      const operation = this.get('operations').findBy('id', String(data.opid)).toJSON({includeId: true});
      const task = {
        name,
        operation,
        id: generateUUID(),
        z_index: 0,
        forms: {},
        left: position.left/zoomScale,
        top: position.top/zoomScale,
        operation_id: data.opid
      };

      this.get('workflow.tasks').addObject(task);
      this.set('hasChanged', true);
    },

    removeTask(task, endpoints) {
      const flows = this.get('workflow.flows');
      const flowsToRemove = flows.filter((el) => {
        return el.source_id === task.id || el.target_id === task.id;
      });
      endpoints.forEach(e => this.get('jsplumb').deleteEndpoint(e));

      flows.removeObjects(flowsToRemove);
      this.get('workflow.tasks').removeObject(task);
      this.set('hasChanged', true);
    },

    setDraggable(el, task){
      this.get('jsplumb').draggable(el, {
        grid:[10,10],
        containment: true,
        stop: (ev) => {
          this.set('hasChanged', true);
          task.left = ev.pos[0];
          task.top  = ev.pos[1];
        }
      });
    },

    addEndpoint(endpoints, el, opts){
      endpoints.addObject(this.get('jsplumb').addEndpoint(el, opts));
    },
  }
});
