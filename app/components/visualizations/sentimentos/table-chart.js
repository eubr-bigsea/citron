import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
  },

  // Attributes bingins
  dataUrl:  function(){ return this.get('dataUrl'); }.property('dataUrl'),
  width:    function(){ return this.get('width'); }.property('width'),
  height:   function(){ return this.get('height'); }.property('height'),
  _id:      function(){ return this.get('_id'); }.property('_id'),
  style:    function(){ return "width:"+this.get('width')+"; height:"+this.get('height')+";"; }.property('style'),
  columns:  function(){ return this.get("columns"); }.property('columns'),
  type:     function(){ return this.get("type"); }.property('type'),

  // Chart var
  _var: null,

  _data:null,

  actions: {

    sortTable(index) {

    }
  },

  // Draw Chart

  didInsertElement: function(){

    let component = this;
    let dataUrl = this.get('dataUrl');

    let columns = JSON.parse(this.get("columns"));
    let type = this.get("type");

    // Get data from API
    $.ajax({
      url: dataUrl,
      type: "GET",
      beforeSend() { gViz.helpers.loading.show(); },
      contentType: "application/json",
      //data: JSON.stringify({}),
      success(data) {

        data = data[0];

        // color scale
        let colors = { scale: gViz.helpers.colors.linear(data.links, "value", ["orange", "green"]) };

				let parse = function(attr) {

          data[attr].forEach(function(d) {
            d["sum"] = 0;
            d["total_num"] = 0;
          });

          // Calculates avg sentiment score for each paper and user
          data.links.forEach(function(link){

            var element = $.grep(data[attr], function(d) {
              return d.id === link[attr.slice(0, -1)];
            });

            element = element[0];

            element["sum"] += link["value"];
            element["total_num"] += 1;
          });

          data[attr].forEach(function(d) {

            d["avg"] = ((d["sum"]/d["total_num"]) * 100).toFixed(2);

            var colours = colors.scale(d["avg"]/100);
            var coloursOnly = colours.substring(colours.indexOf('(') + 1, colours.lastIndexOf(')')).split(",");

            var colourString = `rgba(${coloursOnly[0]},${coloursOnly[1]},${coloursOnly[2]}, 0.6)`;

            d["style"] = `
            width:${d["avg"]}%;
            background-color:${colourString};
            `;
          });

          data[attr].sort(function(a, b) { return d3.ascending(a.name, b.name); });
        };

        switch(type.toLowerCase()) {

          case "users":
            parse("rows");
            component.set('_data', data.rows);
            break;
          case "papers":
            parse("columns");
            component.set('_data', data.columns);
            break;

          default: console.log("Unkown Data Type");
        }

        component.set('_columns', columns);
      },

      // Hide loading div and render error
      error() {
        gViz.helpers.loading.hide();
        console.log("Error");
      },

      // Hide loading div and render complete
      complete() {
        gViz.helpers.loading.hide();
        // console.log("complete");
      }
    });
  }
});
