import Component from '@ember/component';
import FileSaver from 'file-saver';

export default Component.extend({
  didInsertElement(){
    this._super(...arguments);
    let bodyWrapper = this.$('.body-wrapper');
    let tbody = this.$('tbody');

    bodyWrapper.scroll(() => {
      if ( tbody.height() - ( bodyWrapper.height() + bodyWrapper.scrollTop() ) < 1) {
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
  },
  actions: {
    downloadWorkflow(workflow){
      const workflowString = JSON.stringify(workflow.toJSON());
      var blob = new Blob([workflowString], {type: "application/json;charset=utf-8"});
      FileSaver.saveAs(blob, `${workflow.name}.json`)
    }
  }
});
