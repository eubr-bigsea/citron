import DS from 'ember-data';
//import ActiveModelAdapter from 'active-model-adapter';
//import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
//import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  host: 'http://beta.ctweb.inweb.org.br/tahiti',
  //headers: { 'X-Auth-Token': '123456' }
  authorizer: 'authorizer:custom'
});

//export default ActiveModelAdapter.extend(DataAdapterMixin, {
//  host: `${config.host}`,
//  authorizer: 'authorizer:custom'
//});
