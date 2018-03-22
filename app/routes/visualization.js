import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import ENV from 'citron/config/environment';

export default Route.extend({
  model(params) {
    var dic = ENV.APP.visualizations;
    var viz = params.name != null && dic[params.name] != null ? dic[params.name] : dic.list;
    return hash({
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
