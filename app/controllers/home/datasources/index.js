import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
  // query params for backend
  queryParams: ['page', 'asc', 'name', 'sort', 'size'],
  page: 1,
  perPage: 10,
  size: 10,
  asc: true,
  sort: 'name',
  name: '',
  // modals triggers
  uploadModal: false,
  deleteModal: false,
  alertModal: false,
  // select and delete vars
  selectAll: false,
  deleteButton: false,
  toDelete: A(),

  actions: {
    search(){ //tahiti only support search by name
      this.send('reloadModel');
    },
    toggleUploadModal(){
      this.set('uploadModal', true);
    },
    toggleUpload(){
      this.toggleProperty('uploadTab');
    },
    toggleDeleteModal(datasource){
      this.send('unselectAll');
      let toDelete = this.get('toDelete');
      toDelete.pushObject(datasource);
      this.set('deleteModal', true);
    },
    toggleDeleteMultipleModal(){
      let datasources = this.get('model.datasources').filterBy('selected', true);
      this.set('toDelete', datasources);
      this.set('deleteModal', true);
    },
    deleteDatasource(){
      this.set('deleteModal', false);
      let toDelete = this.get('toDelete');
      toDelete.forEach((datasource) => { datasource.destroyRecord() });
      this.send('unselectAll');
    },
    unselectAll(){
      this.set('toDelete', A());
      this.set('selectAll', false);
      this.set('deleteButton', false);
      let datasources = this.get('model.datasources');
      datasources.forEach((datasource) => { datasource.set('selected', false) });
    },
    toggleSelect(){
      if(this.get('selectAll')){
        this.send('unselectAll');
      } else {
        this.send('selectAll');
      }
    },
    selectAll(){
      let datasources = this.get('model.datasources');
      this.set('selectAll', true);
      this.set('deleteButton', true);
      datasources.forEach((datasource) => { datasource.set('selected', true) });
    },
    selectSingle(datasource){
      datasource.toggleProperty('selected');
      let datasources = this.get('model.datasources').filterBy('selected', true);
      if(datasources.length > 0){
        this.set('deleteButton', true);
        if(datasources.length == this.get('model.datasources.length')){
          this.set('selectAll', true);
        } else {
          this.set('selectAll', false);
        }
      } else {
        this.set('deleteButton', false);
      }
    },
    deleteAll(){
      let datasources = this.get('model.datasources');
      let toDelete = datasources.filterBy('selected', true);
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
      let count = this.get('model.datasources.length');
      let size = this.get('size');
      if( size <= count ){
        this.set('size', size + this.get('perPage'));
        this.send('reloadModel');
      }
    }
  }
});
