import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import config from '../../../config/environment';
import $ from 'jquery';
import { run } from '@ember/runloop';

export default Controller.extend({
  i18n: service(),

  alertModal: false,
  alertContent: null,
  alertCallback: null,

  init(){
    this._super(...arguments);
    this.set('formats', [
      //      { name: 'XML', value: 'XML_FILE' },
      //      { name: 'NetCDF4', value: 'NETCDF4' },
      //      { name: 'HDF5', value: 'HDF5' },
      { name: 'Shapefile', value: 'SHAPEFILE' },
      { name: 'Text', value: 'TEXT' },
      //      { name: 'Custom', value: 'CUSTOM' },
      { name: 'JSON', value: 'JSON' },
      { name: 'CSV', value: 'CSV' },
      //      { name: 'Pickle', value: 'PICKLE' },
    ]);
    this.set('attrDelimiters', [
      { name: ',', value:',' },
      { name: '.', value:'.'},
      { name: ';', value:';'},
      { name: "\\t [tab]", value:'{tab}' },
      { name: "\\n [new_line]", value: '{new_line}'}
    ]);
    this.set('textDelimiters', [
      { name: "'", value:"'"},
      { name: "\\", value:"\\"},
      { name: '"', value:'"'},
      { name: "\\t [tab]", value:'{tab}' },
    ])
    this.set('encodings', [
      { name: 'UTF-8', value:'utf8'},
      { name: 'LATIN 1', value:'latin1'},
    ]);

  },



  actions: {
    toggleIsPublic(){
      this.toggleProperty('model.is_public');
    },
    toggleIsFirstLineHeader(){
      this.toggleProperty('model.is_first_line_header');
    },
    saveDatasource(){
      let datasource = this.get('model');
      datasource.save().then(
        () => { // Success
          const title = 'datasources.alert-modal.saveSuccess.title';
          const message = 'datasources.alert-modal.saveSuccess.message';

          this.set('alertContent', { title, message });
          this.toggleProperty('alertModal');
        },
        () =>  { // Failed
          const title = 'datasources.alert-modal.saveFailed.title';
          const message = 'datasources.alert-modal.saveFailed.message'

          this.set('alertContent', { title, message });
          this.toggleProperty('alertModal');
        }
      );
    },
    inferSchema(){
      let datasource = this.get('model');
      datasource.save().then(
        () => {
          $.ajax({
            type: "POST",
            url:`${config.limonero}/datasources/infer-schema/${datasource.id}`,
            contentType:"application/json",
            dataType:"json",
            data: JSON.stringify({
              delimiter: datasource.get('attribute_delimiter'),
              quote_char: datasource.get('text_delimiter'),
              use_header: datasource.get('is_first_line_header')
            })
          }).then(
            () => { // Success
              run(() => {
                const title = 'datasources.alert-modal.inferSuccess.title';
                const message = 'datasources.alert-modal.inferSuccess.message';
                this.send('reloadModel');

                this.set('alertContent', { title, message });
                this.toggleProperty('alertModal');
              });
            },
            (error) =>  { // Failed
              run(() => {
                const title = 'datasources.alert-modal.inferFailed.title';
                const message = 'datasources.alert-modal.inferFailed.message';
                const errorMessage = error.responseJSON.message;

                this.set('alertContent', { title, message, errorMessage });
                this.toggleProperty('alertModal');
              });
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    },
    transitionTo(route){
      this.transitionToRoute(route);
    },
  }
});
