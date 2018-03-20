import Component from '@ember/component';

export default Component.extend({
  didReceiveAttrs(){
    let jobs = this.get('jobs.length') ? this.get('jobs.length') : 1 ;
    this.set('count', jobs);
  }
});
