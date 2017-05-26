import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  session: service(),

  init() {
    this._super(...arguments);
  },

  // Attributes bingins
  width:  function(){ return this.get('width'); }.property('width'),
  height: function(){ return this.get('height'); }.property('height'),
  _id:    function(){ return this.get('_id'); }.property('_id'),
  style:  function(){ return "width:"+this.get('width')+"; height:"+this.get('height')+";"; }.property('style'),

  // Chart var
  _var: null,

  // Draw Chart
  draw: function() {

    let component = this;
    let currentUser = this.get('currentUser');

    Ember.$.ajax({
      url: component.get('dataUrl'),
      type: "GET",
      data: {},
      beforeSend: (request) => {
        gViz.helpers.loading.show();

        request.setRequestHeader('X-Auth-Token', '123456');
        request.setRequestHeader('Authorization', `Token token=${component.get('session.data.authenticated.token')} email=${component.get('session.data.authenticated.email')}`);
      },
      success: (data) => {
        let parseData = function(d, discrete, continuous) {
          d["discrete"]   =  d[discrete];
          d["continuous"] = +d[continuous];

          delete(d[discrete]);
          delete(d[continuous]);

          return d;
        };

        var discrete = "name";
        var continuous = "value";

        // Set title
        component.set('title', data.title);

        // Get data
        var data = data.data;
        data.map(function(d) { parseData(d, discrete, continuous); });

        component._var = gViz.vis.bar_chart()
          ._var(component._var)
          ._class("bar-chart")
          .container(".gViz-wrapper[data-id='"+component.get('_id')+"']")
          .data(data)
          .build();

      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        gViz.helpers.loading.hide();
      },
    });
  },

  didInsertElement: function(){

    let component = this;
    var data_index = 0;

    d3.selectAll(`.btn[data-id=${component.get('_id')}]`)
      .on("click", function() {
        var data_index = this.value - 1;
        component.draw(data_index);
      });

    this.draw(data_index);
  }
});
