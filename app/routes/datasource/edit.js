import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(params){
    this._super(...arguments);
    return RSVP.hash({
      datasource: this.store.findRecord('datasource', params.id),
      users: this.store.findAll('user')
    });
  },
  setupController(controller){
    var formats = [
      { name: 'XML', value: 'XML_FILE' },
      { name: 'NetCDF4', value: 'NETCDF4' },
      { name: 'HDF5', value: 'HDF5' },
      { name: 'Shapefile', value: 'SHAPEFILE' },
      { name: 'Text', value: 'TEXT' },
      { name: 'Custom', value: 'CUSTOM' },
      { name: 'JSON', value: 'JSON' },
      { name: 'CSV', value: 'CSV' },
      { name: 'Pickle', value: 'PICKLE' },
    ];
    controller.set('formats', formats);
    return this._super(...arguments);
  },
  actions:{
    save(){
      var datasource = this.currentModel.datasource;
      datasource.save().then(
        () => { this.transitionTo('datasources') },
        () => { $("#flashError").show().fadeIn().delay(2000).fadeOut('slow'); }
      );
    },
  },
});
