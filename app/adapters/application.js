import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin,{
  i18n: service(),
  session: service(),

  authorizer: 'authorizer:devise',
  headers: computed('i18n.locale', 'session.data.authenticated.userId', function(){
    return {
      'X-Auth-Token': '123456',
      'Locale': this.get('i18n.locale'),
      'X-User-Id': this.get('session.data.authenticated.userId')
    }
  }).property('i18n.locale', 'session.data.authenticated.userId'),
});

