import Ember from 'ember';

const { inject: {service}} = Ember;

export default Ember.Component.extend({
  session: service(),

  didReceiveAttrs(){
    this.set('locale', this.get('session.data.locale'));
  }
});
