import Controller from '@ember/controller';

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

  init(){
    this._super(...arguments);
    this.set('timeProperties', { selected: 'updated', options: ['updated', 'created'] } );
  },

  actions: {
    search(){ //tahiti only support search by name
      this.send('reloadModel');
    },
    transitionToDraw(id, queryParams){
      this.transitionToRoute('home.workflows.draw', id, queryParams);
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
