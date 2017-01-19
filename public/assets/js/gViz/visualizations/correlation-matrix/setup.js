gViz.vis.correlation_matrix.setup = function() {
  "use strict";

  // Get attributes values
  let _var      = undefined;
  var action    = 'setup';
  var animation = 900;

  // Validate attributes
  var validate = function(step) {

    switch (step) {
      case 'run': return true;
      default: return false;
    }
  };

  // Main function
  var main = function(step) {
    // Validate attributes if necessary
    if (validate(step)) {

      switch (step) {

        // Build entire visualizations
        case 'run':

          switch (action) {

            case 'setup':

							_var.matrix = [];

							// Compute index per node.
							_var._data.rows.forEach(function(node, i) {
							  node.index = i;
    
                // Parse Group to Int
                node.group = parseInt(node.group.split(" ")[1]);

                // For convention x = line and y = column. Z is the value of
                // each cell
								_var.matrix[i] = d3.range(_var._data.columns.length).map(function(j) { return {x: i, y: j, z: 0}; });
							});

              // Parse Group to Int
              _var._data.columns.forEach(function(node) {
                node.group = parseInt(node.group.split(" ")[1]);
              });

							// Convert links to matrix; count occurrences.
							_var._data.links.forEach(function(link) {

                let row = parseInt(link.row.split("-")[1]) - 1;
                let column = parseInt(link.column.split("-")[1]) - 1;
                link.value = +link.value

								_var.matrix[row][column].z    += link.value;
							});

              // xScale positions each column on the x axis
							_var.xScale.domain(d3.range(_var._data.columns.length));

              // yScale positions each row on the y axis
							_var.yScale.domain(d3.range(_var._data.rows.length));

				      // Original
              /* 
              _var.nodes  = _var._data.nodes;
              var n = _var.nodes.length;
  
							// Compute index per node.
							_var.nodes.forEach(function(node, i) {
							  node.index = i;
                node.count = 0
								_var.matrix[i] = d3.range(n).map(function(j) { return {x: j, y: i, z: 0}; });
							});

							// Convert links to matrix; count character occurrences.
							_var._data.links.forEach(function(link) {
								_var.matrix[link.source][link.target].z += link.value;
								_var.matrix[link.target][link.source].z += link.value;
								_var.matrix[link.source][link.source].z += link.value;
								_var.matrix[link.target][link.target].z += link.value;
							});

							// The default sort order.
							_var.xScale.domain(d3.range(n));//.sort(function(a, b) {
                return d3.ascending(_var.nodes[a].name, _var.nodes[b].name); }));
              */

              break;
          }

          break;
      }
    }

    return _var;
  };

  // Exposicao de variaveis globais
  ['_var','action','animation'].forEach(function(key) {

    // Attach variables to validation function
    validate[key] = function(_) {
      if (!arguments.length) { eval(`return ${key}`); }
      eval(`${key} = _`);
      return validate;
    };

    // Attach variables to main function
    return main[key] = function(_) {
      if (!arguments.length) { eval(`return ${key}`); }
      eval(`${key} = _`);
      return main;
    };
  });

  // Execute the specific called function
  main.run = _ => main('run');

  return main;
}
