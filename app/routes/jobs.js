import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, RouteMixin, {
  currentUser: Ember.inject.service('current-user'),
  perPage: 20,
  queryParams: {
    sort: { refreshModel: true },
    asc:  { refreshModel: true }
  },

  model(params) {
    params.user_id = this.get('currentUser.id');
    params.paramMapping = { total_pages: 'pages' }

    return this.findPaged('job', params);
  },
});
