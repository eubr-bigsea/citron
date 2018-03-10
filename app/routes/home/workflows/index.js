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

    // return this.findPaged('workflow', params);
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
  actions: {
    didTransition(){
      this.controller.set('createModal', false);
    }
  }
});
