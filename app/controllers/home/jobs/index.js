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
  timeProperties: null,
  selectAll: false,
  deleteButton: false,
  toDelete: A(),

  init(){
    this._super(...arguments);
    this.set('timeProperties', { selected: 'finished', options: ['created', 'finished'] } );
  },

  actions: {
    search(){ //tahiti only support search by name
      this.send('reloadModel');
    },
    transitionToDraw(id, queryParams){
      this.transitionToRoute('home.workflows.draw', id, queryParams);
    },
    toggleCreateModal(){
      this.set('createModal', true);
    },
    transitionToDraw(id, queryParams){
      this.transitionToRoute('home.workflows.draw', id, queryParams);
    },
    toggleDeleteModal(job){
      this.send('unselectAll');
      let toDelete = this.get('toDelete');
      toDelete.pushObject(job);
      this.set('deleteModal', true);
    },
    toggleDeleteMultipleModal(){
      let jobs = this.get('model').filterBy('selected', true);
      this.set('toDelete', jobs);
      this.set('deleteModal', true);
    },
    deleteJob(){
      this.set('deleteModal', false);
      let toDelete = this.get('toDelete');
      toDelete.forEach((job) => { job.destroyRecord() });
      this.send('unselectAll');
    },
    unselectAll(){
      this.set('toDelete', A());
      this.set('selectAll', false);
      this.set('deleteButton', false);
      $('#fading-button').removeClass('anim');
      let jobs = this.get('model');
      jobs.forEach((job) => { job.set('selected', false) });
    },
    toggleSelect(){
      if(this.get('selectAll')){
        this.send('unselectAll');
      } else {
        this.send('selectAll');
      }
    },
    selectAll(){
      let jobs = this.get('model');
      this.set('selectAll', true);
      $('#fading-button').addClass('anim');
      this.set('deleteButton', true);
      jobs.forEach((job) => { job.set('selected', true) });
    },
    selectSingle(job){
      job.toggleProperty('selected');
      let jobs = this.get('model').filterBy('selected', true);
      if(jobs.length > 0){
        this.set('deleteButton', true);
        $('#fading-button').addClass('anim');
        if(jobs.length == this.get('model.length')){
          this.set('selectAll', true);
        } else {
          this.set('selectAll', false);
        }
      } else {
        this.set('deleteButton', false);
        $('#fading-button').removeClass('anim');
      }
    },
    deleteAll(){
      let jobs = this.get('model');
      let toDelete = jobs.filterBy('selected', true);
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
    }
  }
});
