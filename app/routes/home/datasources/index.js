import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import RSVP from 'rsvp';

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
    return RSVP.hash({
      datasources: this.findPaged('datasource', params),
      users: this.store.findAll('user')
    });
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('users', model.users);
    controller.set('datasources', model.datasources);
  },
  actions: {
    refreshModel(){
      this.refresh();
    }
  }
});
