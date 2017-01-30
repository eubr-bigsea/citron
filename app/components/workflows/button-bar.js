import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),
  actions: {
    deleteWorkflows(){
      var confirmText = 'Delete checked workflows?';
      var i;
      if(confirm( confirmText)){
        var checked = Ember.$(":checkbox:checked");
        for (i=0; i<checked.length; i++){
          this.get('store').findRecord('workflow',checked[i].id).then(function(model){
            model.destroyRecord();
          });
        }
      }
    },
  }
});
