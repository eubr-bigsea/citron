'use strict';

// Começa quando o DOM já estiver carregado
gViz.initializers.tooltipster = function (container) {

  if (container == null) {
    container = '';
  }

  $(container + " [data-toggle='tooltipster']").tooltipster({
    contentAsHTML: true,
    debug: true,
    trigger: 'click'
  });
};
