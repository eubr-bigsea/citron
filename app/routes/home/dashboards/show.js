import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import config from '../../../config/environment';

export default Route.extend({
  model(params){
    return RSVP.hash({
      caipirinhaUrl: config.caipirinha,
      model: this.store.findRecord('dashboard', params.id)
    });
  }
});
