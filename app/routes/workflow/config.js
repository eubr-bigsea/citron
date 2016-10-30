import Ember from 'ember';
import groupBy from 'lemonade-ember/utils/group-by';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';


export default Ember.Route.extend({
    model(params) {
         this._super(...arguments);
      window.p = params;
      return RSVP.hash({
             });
    },
});
