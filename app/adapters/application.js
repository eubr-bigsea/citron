import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import Ember from 'ember';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin,{
  session: Ember.inject.service(),

  authorizer: 'authorizer:devise',
  headers: Ember.computed('session.data.locale', function(){
    return {
      'X-Auth-Token': '123456',
      'Locale': this.get('session.data.locale')
    }
  }).property('session.data.locale'),
});

