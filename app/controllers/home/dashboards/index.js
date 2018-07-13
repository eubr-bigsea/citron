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
    toggleDeleteModal(dashboard){
      this.send('unselectAll');
      let toDelete = this.get('toDelete');
      toDelete.pushObject(dashboard);
      this.set('deleteModal', true);
    },
    toggleDeleteMultipleModal(){
      let dashboards = this.get('model').filterBy('selected', true);
      this.set('toDelete', dashboards);
      this.set('deleteModal', true);
    },
    deleteDashboard(){
      this.set('deleteModal', false);
      let toDelete = this.get('toDelete');
      toDelete.forEach((dashboard) => { dashboard.destroyRecord() });
      this.send('unselectAll');
    },
    unselectAll(){
      this.set('toDelete', A());
      this.set('selectAll', false);
      this.set('deleteButton', false);
      let dashboards = this.get('model');
      dashboards.forEach((dashboard) => { dashboard.set('selected', false) });
    },
    toggleSelect(){
      if(this.get('selectAll')){
        this.send('unselectAll');
      } else {
        this.send('selectAll');
      }
    },
    selectAll(){
      let dashboards = this.get('model');
      this.set('selectAll', true);
      this.set('deleteButton', true);
      dashboards.forEach((dashboard) => { dashboard.set('selected', true) });
    },
    selectSingle(dashboard){
      dashboard.toggleProperty('selected');
      let dashboards = this.get('model').filterBy('selected', true);
      if(dashboards.length > 0){
        this.set('deleteButton', true);
        if(dashboards.length == this.get('model.dashboards.length')){
          this.set('selectAll', true);
        } else {
          this.set('selectAll', false);
        }
      } else {
        this.set('deleteButton', false);
      }
    },
    deleteAll(){
      let dashboards = this.get('model');
      let toDelete = dashboards.filterBy('selected', true);
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
      let count = this.get('model.length');
      let size = this.get('size');
      if( size <= count ){
        this.set('size', size + this.get('perPage'));
        this.send('reloadModel');
      }
    },
  }
});
