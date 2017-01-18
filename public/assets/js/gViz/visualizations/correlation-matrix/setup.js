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
  
							_var.nodes = _var._data.nodes;
							var n = _var.nodes.length;

							// Compute index per node.
							_var.nodes.forEach(function(node, i) {
							  node.index = i;
								node.count = 0;
								_var.matrix[i] = d3.range(n).map(function(j) { return {x: j, y: i, z: 0}; });
							});

							// Convert links to matrix; count character occurrences.
							_var._data.links.forEach(function(link) {
								_var.matrix[link.source][link.target].z += link.value;
								_var.matrix[link.target][link.source].z += link.value;
								_var.matrix[link.source][link.source].z += link.value;
								_var.matrix[link.target][link.target].z += link.value;
								_var.nodes[link.source].count += link.value;
								_var.nodes[link.target].count += link.value;
							});

							// Precompute the orders.
							_var.orders = {
								name : d3.range(n).sort(function(a, b) { return d3.ascending(_var.nodes[a].name, _var.nodes[b].name); }),
								count: d3.range(n).sort(function(a, b) { return _var.nodes[b].count - _var.nodes[a].count; }),
								group: d3.range(n).sort(function(a, b) { return _var.nodes[b].group - _var.nodes[a].group; })
							};

							// The default sort order.
							_var.xScale.domain(_var.orders.name);

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
