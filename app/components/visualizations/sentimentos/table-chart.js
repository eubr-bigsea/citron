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

  // Positional Parameters
 	// positionalParams: ['columns'],

	// // Data
	// columns: Ember.computed('columns', function() {
	// 	return this.get('columns') == null ? Ember.A() : this.get('columns');
	// }),

  // Chart var
  _var: null,

  _data:null,

  actions: {

    sortTable(index) {

			var table, rows, switching, i, x, y, shouldSwitch;
			table = document.getElementById(this.get("_id"));
			switching = true;

			/*Make a loop that will continue until
				no switching has been done:*/
			while (switching) {
				switching = false;
				rows = table.getElementsByTagName("TR");

				for (i = 1; i < (rows.length - 1); i++) {
					shouldSwitch = false;

					/*Get the two elements you want to compare,
						one from current row and one from the next:*/
					x = rows[i].getElementsByTagName("TD")[index];
					y = rows[i + 1].getElementsByTagName("TD")[index];

					//check if the two rows should switch place:
					if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

						//if so, mark as a switch and break the loop:
						shouldSwitch= true;
						break;
					}
				}
				if (shouldSwitch) {
					/*If a switch has been marked, make the switch
						and mark that a switch has been done:*/
					rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
					switching = true;
				}
      }
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

        let parse = function(attr) {

          data[attr].forEach(function(d) {
            d["sum"] = 0;
            d["total_num"] = 0;
          });

          data.links.forEach(function(link){

            var element = $.grep(data[attr], function(d) { 
              return d.id === link[attr.slice(0, -1)]; 
            });

            element = element[0];

            element["sum"] += link["value"];
            element["total_num"] += 1;
          });

          let progress_bar_height = "25px";

          data[attr].forEach(function(d) {
            d["avg"] = ((d["sum"]/d["total_num"]) * 100).toFixed(2);
            d["progress_bar_height"] = progress_bar_height;
            d["style"] = `
            width:${d["avg"]}%; 
            height:${d["progress_bar_height"]}; 
            background-color:steelblue;
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
