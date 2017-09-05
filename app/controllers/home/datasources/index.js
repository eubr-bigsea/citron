import Ember from 'ember';

export default Ember.Controller.extend({
  filterText: '',
  uploadTab: false,
  users: null,

  init() {
    this._super(...arguments);
    this.addObserver('filterText', this, 'filterDidChange');
  },

  filterDidChange() {
    //a temporary filter, correct way is send to backend
    let filterText = this.get('filterText').toLowerCase();
    let datasources = this.get('model').filter(function(datasource){
      return datasource.get('name').toLowerCase().indexOf(filterText) !== -1;
    });
    this.set('datasources', datasources);
  },
});
