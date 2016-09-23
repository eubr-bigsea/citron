import Ember from 'ember';

let url = "http://beta.ctweb.inweb.org.br/tahiti";

export default Ember.Route.extend({
  model() {
    /*FIXME improve */
    this._super(...arguments);
    var data = Ember.$.get(`${url}/operations`, {token: '123456'});

    return data.then(function(rawObj) {
      var el = {};
      rawObj.forEach(function(o) {
        var cat = o.categories.filter(e => e.type === 'parent')[0];
        var name = cat === undefined? 'Others' : cat.name;

        if(el[name] === undefined) {
          el[name] = [];
        }

        el[name].push(o);
      });
      return el;
    });
  }
});
