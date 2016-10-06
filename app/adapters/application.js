import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'http://beta.ctweb.inweb.org.br/tahiti',
  headers: { 'X-Auth-Token': '123456' }
});
