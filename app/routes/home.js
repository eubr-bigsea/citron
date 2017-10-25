import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import $ from 'jquery';

export default Route.extend(AuthenticatedRouteMixin, {
  i18n: service(),
  session: service(),

  beforeModel() {
    let data = this.get('session.data');
    $.ajaxSetup({ headers: {
      'Authorization': `Token token=${data.token}, email=${data.email}`
    }});
  },
});
