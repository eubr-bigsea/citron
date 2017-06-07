import Ember from 'ember';
import ENV from 'lemonade-ember/config/environment';

export default Ember.Route.extend({
  model(params) {
    var dic = ENV.APP.visualizations;
    var viz = params.name != null && dic[params.name] != null ? dic[params.name] : dic.list;
    return Ember.RSVP.hash({
      icon: viz.icon != null ? viz.icon : "",
      title: viz.title != null ? viz.title : "",
      subtitle: viz.subtitle != null ? viz.subtitle : "",
      description: viz.description != null ? viz.description : "",
      component: viz.component != null ? viz.component : "",
      url: viz.component != null ? viz.url : "",
      dataUrl: viz.component != null ? viz.dataUrl : ""
    });
  }
});
