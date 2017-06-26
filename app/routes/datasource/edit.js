import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    this._super(...arguments);
    return this.store.findRecord('datasource', params.id);
  },
  actions:{
    save(){
      var datasource = this.currentModel;
      datasource.save().then(
        () => { this.transitionTo('datasources') },
        () => { $("#flashError").show().fadeIn().delay(2000).fadeOut('slow'); }
      );
    },
  },
});
