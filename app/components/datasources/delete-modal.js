import Component from '@ember/component';

export default Component.extend({
  didReceiveAttrs(){
    let datasources = this.get('datasources.length') ? this.get('datasources.length') : 1 ;
    this.set('count', datasources);
  }
});
