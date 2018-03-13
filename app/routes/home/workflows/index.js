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

    return RSVP.hash({
      workflows: this.store.query('workflow', params),
      platforms: this.store.query('platform', { enabled: true} ),
      images:
      [
        {id: 0, name: 'img0.jpg'},
        {id: 1, name: 'img1.jpg'},
        {id: 2, name: 'img2.jpg'},
        {id: 3, name: 'img3.jpg'},
        {id: 4, name: 'img4.jpg'},
        {id: 5, name: 'img5.jpg'},
        {id: 6, name: 'img6.jpg'},
        {id: 7, name: 'img7.jpg'},
        {id: 8, name: 'img8.jpg'},
        {id: 9, name: 'img9.jpg'},
      ]
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
      controller.set('timeProperties.selected', 'updated');
      controller.set('createModal', false);
      controller.set('deleteModal', false);
      controller.set('deleteMultipleModal', false);
      controller.set('alertModal', false);
      controller.set('selectAll', false);
      controller.set('createModal', false);
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
