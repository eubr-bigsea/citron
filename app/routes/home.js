import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
const { inject: { service } } = Ember;
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  i18n: service(),
  session: service(),

  beforeModel() {
    let data = this.get('session.data');
    $.ajaxSetup({ headers: {
      'Authorization': `Token token=${data.token}, email=${data.email}`
    }});
  },
});
