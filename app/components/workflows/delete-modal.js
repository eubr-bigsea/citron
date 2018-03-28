import Component from '@ember/component';

export default Component.extend({
  didReceiveAttrs(){
    let workflows = this.get('workflows.length') ? this.get('workflows.length') : 1 ;
    this.set('count', workflows);
  }
});
