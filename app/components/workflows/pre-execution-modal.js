import Component from '@ember/component';
import moment from '@moment';
import $ from 'jquery';

export default Component.extend({
  didInsertElement(){
    this._super(...arguments);
    const name = moment().format("DD-MM HH:mm") + ' - ' + this.get('workflowName');
    const id = this.get('clusters.firstObject.id');
    this.set('jobHash', { name, cluster: { id } });
  },
  actions: {
    setupSelect2(){
      let clusterId = this.get('jobHash.cluster.id');
      let clusters = []
      this.get('clusters').forEach((cluster) => {
        let aux = {}
        aux.id = cluster.get('id');
        aux.text = cluster.get('name');
        aux.description = cluster.get('description');
        aux.selected = clusterId === aux.id ? true : false;
        clusters.push(aux);
      });
      let formatState = function(state){
        if (!state.id) { return state.name; }
        var $state = $(`<h4>${state.text}</h4><h5>${state.description}</h5>`);
        return $state;
      };
      $('#clusters-pre-execution').select2({
        data: clusters,
        templateResult: formatState,
        minimumResultsForSearch: -1
      });
    },
  }
});
