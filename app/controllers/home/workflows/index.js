import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
  // query params for backend
  queryParams: ['page', 'asc', 'name', 'sort', 'size'],
  page: 1,
  perPage: 10,
  size: 10,
  asc: false,
  sort: 'id',
  name: '',
  timeProperties: null,
  // modals triggers
  createModal: false,
  deleteModal: false,
  // select and delete vars
  selectAll: false,
  deleteButton: false,
  toDelete: A(),

  init(){
    this._super(...arguments);
    this.set('timeProperties', { selected: 'updated', options: ['updated', 'created'] } );
  },

  actions: {
    search(){ //tahiti only support search by name
      this.send('reloadModel');
    },
    toggleCreateModal(){
      this.set('createModal', true);
    },
    transitionToDraw(id, queryParams){
      this.transitionToRoute('home.workflows.draw', id, queryParams);
    },
    toggleDeleteModal(workflow){
      this.send('unselectAll');
      let toDelete = this.get('toDelete');
      toDelete.pushObject(workflow);
      this.set('deleteModal', true);
    },
    toggleDeleteMultipleModal(){
      let workflows = this.get('model.workflows').filterBy('selected', true);
      this.set('toDelete', workflows);
      this.set('deleteModal', true);
    },
    deleteWorkflow(){
      this.set('deleteModal', false);
      let toDelete = this.get('toDelete');
      toDelete.forEach((workflow) => { workflow.destroyRecord() });
      this.send('unselectAll');
    },
    unselectAll(){
      this.set('toDelete', A());
      this.set('selectAll', false);
      this.set('deleteButton', false);
      let workflows = this.get('model.workflows');
      workflows.forEach((workflow) => { workflow.set('selected', false) });
    },
    toggleSelect(){
      if(this.get('selectAll')){
        this.send('unselectAll');
      } else {
        this.send('selectAll');
      }
    },
    selectAll(){
      let workflows = this.get('model.workflows');
      this.set('selectAll', true);
      this.set('deleteButton', true);
      workflows.forEach((workflow) => { workflow.set('selected', true) });
    },
    selectSingle(workflow){
      workflow.toggleProperty('selected');
      let workflows = this.get('model.workflows').filterBy('selected', true);
      if(workflows.length > 0){
        this.set('deleteButton', true);
        if(workflows.length == this.get('model.workflows.length')){
          this.set('selectAll', true);
        } else {
          this.set('selectAll', false);
        }
      } else {
        this.set('deleteButton', false);
      }
    },
    deleteAll(){
      let workflows = this.get('model.workflows');
      let toDelete = workflows.filterBy('selected', true);
      this.set('toDelete', toDelete);
      this.set('deleteModal', true);
    },
    sortBy(property){
      if(this.get('sort') === property){
        let prevOrder = this.get('asc');
        let order = prevOrder === true ? false : true;
        this.set('asc', order);
      } else {
        this.set('sort', property);
        this.set('asc', true);
      }
      this.send('reloadModel');
    },
    sortFromDropdown(property){
      this.send('sortBy', property);
      this.set('timeProperties.selected', property);
    },
    loadNext: function() {
      let count = this.get('model.workflows.length');
      let size = this.get('size');
      if( size <= count ){
        this.set('size', size + this.get('perPage'));
        this.send('reloadModel');
      }
    }
  }
});
