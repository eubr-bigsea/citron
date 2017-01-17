// Começa quando o DOM já estiver carregado
gViz.initializers.libs = function(container) {

  if (container == null) { container = ''; }

  // Tooltipster
  gViz.initializers.tooltipster()

  return;
};

// Reload de initializer para mudanca de páginas
$(() => gViz.initializers.libs());
