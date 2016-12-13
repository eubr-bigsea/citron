import Ember from 'ember';

export default Ember.Route.extend({
  actions:{
    openVisualization(path){
      var host = location.hostname;
      var id = location.pathname.split('/')[2];
      window.open(`http://${host}:8000/${path}?id=${id}`,'_blank')
    },
  },
});
