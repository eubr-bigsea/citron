import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  i18n: service(),

  headers: computed('i18n.locale', function() {
    return {
      'X-Auth-Token': '123456',
      Locale: this.get('i18n.locale')
    };
  }).property('i18n.locale')
});
