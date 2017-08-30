import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

const { inject: { service } } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin,{
  sessionAccount: service(),
  perPage: 20,
  queryParams: {
    sort: { refreshModel: true },
    asc:  { refreshModel: true }
  },

  model(params) {
    params.user_id = this.get('sessionAccount.userId');
    params.enabled = true;
    params.paramMapping = { total_pages: 'pages' }

    return this.findPaged('dashboard', params);
  },

});
