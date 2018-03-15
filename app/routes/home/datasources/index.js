import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend(AuthenticatedRouteMixin, {
  sessionAccount: service(),
  i18n: service(),

  model(params) {
    params.user_id = this.get('sessionAccount.userId');
    params.enabled = true;
    console.log('params')

    return RSVP.hash({
      datasources: this.store.query('datasource', params),
    });
  },
  setupController(controller){
    this._super(...arguments);
    controller.set('locale', this.get('i18n.locale'));
  },
  resetController(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      controller.set('page', 1);
      controller.set('size', 10);
      controller.set('asc', true);
      controller.set('sort', name);
      controller.set('name', '');
      controller.set('uploadModal', false);
      controller.set('deleteModal', false);
      controller.set('deleteMultipleModal', false);
      controller.set('selectAll', false);
      controller.set('deleteButton', false);
      controller.set('toDelete', A());
    }
  },
  actions: {
    reloadModel(){
      this.refresh();
    },
  }
});
