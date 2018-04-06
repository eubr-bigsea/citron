import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['vis', 'data'],
  vis: null,
  data: null,

  actions: {

    changeUrl(visId) {
      this.set('vis', visId);
      this.send('reloadModel')
    }

  }

});
