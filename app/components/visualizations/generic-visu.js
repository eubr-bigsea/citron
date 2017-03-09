import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    this.set('url', [
      'http://beta.ctweb.inweb.org.br/caipirinha/dashboard',
      this.get('params.jobId'),
      this.get('params.taskId')
    ].join('/'));

    this.set('visu', "visualizations/" + this.get('params.visu'));
  }
});
