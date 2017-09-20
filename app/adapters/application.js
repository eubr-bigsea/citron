import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import Ember from 'ember';

const { inject: { service } } = Ember;

export default DS.JSONAPIAdapter.extend(DataAdapterMixin,{
  i18n: service(),
  session: service(),

  authorizer: 'authorizer:devise',
  headers: Ember.computed('i18n.locale', function(){
    return {
      'X-Auth-Token': '123456',
      'Locale': this.get('i18n.locale')
    }
  }).property('i18n.locale'),
  headers: Ember.computed('session.data.authenticated.userId', function(){
    return {
      'X-User-Id': this.get('session.data.authenticated.userId')
    }
  }).property('session.data.authenticated.userId'),
});

