import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Route.extend(AuthenticatedRouteMixin, RouteMixin, {
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

    // return this.findPaged('workflow', params);
    return this.store.query('workflow', params);
  },
});
