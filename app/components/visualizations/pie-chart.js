import Ember from 'ember';

export default Ember.Component.extend({
  currentUser: Ember.inject.service('current-user'),

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
  draw: function(){
    let component = this;
    let currentUser = this.get('currentUser');

    Ember.$.ajax({
      url: component.get('dataUrl'),
      type: "GET",
      data: {},
      beforeSend: (request) => {
        gViz.helpers.loading.show();

        request.setRequestHeader('X-Auth-Token', '123456');
        request.setRequestHeader('access-token', currentUser.accessToken);
        request.setRequestHeader('client', currentUser.client);
        request.setRequestHeader('expire', currentUser.expire);
        request.setRequestHeader('uid', currentUser.uid);
        request.setRequestHeader('token-type', currentUser.tokenType);
      },
      success: (data) => {

        // Set title
        component.set('title', data.title);

        let parseData = function(d, label, value) {
          d["label"]   =  d[label];
          d["value"]   = +d[value];

          if(label !== "label") { delete(d[label]); }

          if(value !== "value") { delete(d[value]); }

          return d;
        };

        // Walter data
        var label = "name";
        var value = "value";


        // Get data
        var data = data.data;
        data.map(function(d) { parseData(d, label, value); });

        component._var = gViz.vis.pie_chart()
          ._var(component._var)
          ._class("pie-chart")
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
    this.draw();
  }
});
