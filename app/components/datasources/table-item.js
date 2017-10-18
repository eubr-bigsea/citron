import Component from '@ember/component';

export default Component.extend({
  classNames:['item'],
  tagName: 'li',

  actions: {
    deleteDatasource(datasource){
      var confirmText = `Delete datasource ${datasource.get('name')} ?`;
      if(confirm( confirmText)){ datasource.destroyRecord(); }
    },
  },
});
