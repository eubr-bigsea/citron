import Component from '@ember/component';

export default Component.extend({
  didInsertElement(){
    this._super(...arguments);
    let bodyWrapper = this.$('.body-wrapper');
    let tbody = this.$('tbody');

    bodyWrapper.scroll(() => {
      if ( tbody.height() - ( bodyWrapper.height() + bodyWrapper.scrollTop() ) == 0) {
        this.get('loadNext')();
      }
    })
  },
  didRender(){
    this._super(...arguments);
    let bodyWrapper = this.$('.body-wrapper');
    let tbody = this.$('tbody');

    if(tbody.height() < bodyWrapper.height()){
      this.get('loadNext')();
    }
  }
});
