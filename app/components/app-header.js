import Ember from 'ember';

const { inject: { service }, Component } = Ember;

export default Component.extend({
  classNames: ['language-select'],
  session: service(),
  sessionAccount: service(),

  actions: {
    invalidateSession(){
      this.get('session').invalidate();
    }
  }
});
