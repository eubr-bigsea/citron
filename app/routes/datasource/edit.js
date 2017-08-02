import Ember from 'ember';
import RSVP from 'rsvp';
import config from '../../config/environment';

export default Ember.Route.extend({
  model(params){
    this._super(...arguments);
    return this.store.findRecord('datasource', params.id);
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
    controller.set('delimiter',',');
    controller.set('quote_char', '"');
    controller.set('use_header', false);

    return this._super(...arguments);
  },
  actions:{
    inferSchema(){
      let controller = this.get('controller');
      let component = this;
      $.ajax({
        type: "POST",
        url:`${config.limonero}/datasources/infer-schema/${controller.model.id}`,
        contentType:"application/json",
        dataType:"json",
        data: JSON.stringify({
          delimiter: controller.delimiter,
          quote_char: controller.quote_char,
          use_header: controller.use_header
        })
      }).then(function(response) {
        if(response.status === "OK"){ component.refresh(); }
      });
    },
    save(){
      var datasource = this.currentModel;
      datasource.save().then(
        () => { this.transitionTo('datasources') },
        () => { $("#flashError").show().fadeIn().delay(2000).fadeOut('slow'); }
      );
    },
  },
});
