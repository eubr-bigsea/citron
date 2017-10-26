import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import config from '../../../config/environment';
import $ from 'jquery';

export default Route.extend({
  i18n: service(),
  model(params){
    this._super(...arguments);
    return this.store.findRecord('datasource', params.id);
  },
  setupController(controller){
    var formats = [
      //      { name: 'XML', value: 'XML_FILE' },
      //      { name: 'NetCDF4', value: 'NETCDF4' },
      //      { name: 'HDF5', value: 'HDF5' },
      //      { name: 'Shapefile', value: 'SHAPEFILE' },
      //      { name: 'Text', value: 'TEXT' },
      //      { name: 'Custom', value: 'CUSTOM' },
      //      { name: 'JSON', value: 'JSON' },
      { name: 'CSV', value: 'CSV' },
      //      { name: 'Pickle', value: 'PICKLE' },
    ];
    controller.set('attrDelimiters', [
      { value: ',', key:',' },
      { value: '.', key:'.'},
      { value: ';', key:';'},
      { value: "\\t [tab]", key:'{tab}' },
      { value: "\\n " + this.get('i18n').t('newLine'), key: '{new_line}'}
    ]);
    controller.set('textDelimiters', [
      { value: "'", key:"'"},
      { value: "\\", key:"\\"},
      { value: '"', key:'"'},
      { value: "\\t [tab]", key:'{tab}' },
    ]);
    controller.set('encodings', [
      { value: "UTF-8", key:"utf8"},
      { value: 'LATIN 1', key:'latin1'},
    ]);

    controller.set('formats', formats);

    return this._super(...arguments);
  },
  actions:{
    inferSchema(){
      let model = this.get('currentModel');
      model.save();
      let component = this;
      $.ajax({
        type: "POST",
        url:`${config.limonero}/datasources/infer-schema/${model.id}`,
        contentType:"application/json",
        dataType:"json",
        data: JSON.stringify({
          delimiter: model.get('attribute_delimiter'),
          quote_char: model.get('text_delimiter'),
          use_header: model.get('is_first_line_header')
        })
      }).then(function(response) {
        if(response.status === "OK"){ component.refresh(); }
      });
    },
    save(){
      var datasource = this.currentModel;
      datasource.save().then(
        () => { this.transitionTo('home.datasources') },
        () => { $("#flashError").show().fadeIn().delay(2000).fadeOut('slow'); }
      );
    },
  },
});
