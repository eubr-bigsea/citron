import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
  },
  classNames: ["topicos-vis"],

  // Attributes bingins
  json: Ember.A(),
  tableData: Ember.A(),
  header: ["Tópicos","Eixos","# Comentários","Termos Mais Descritivos"],
  colorsEixos:  d3.scaleOrdinal(d3.schemeCategory20),

  // Chart var
  _var: null,

  // Draw Chart
  drawTable: function(){

    // Initialize variables
    let component = this;
    let dataUrl = this.get('dataUrl');

    // Get data from API
    $.ajax({
      url: dataUrl,
      type: "GET",
      beforeSend() { gViz.helpers.loading.show(); },
      contentType: "application/json",
      success(data) {

        // Set json
        component.set('json', data);

        // Initialize variables
        let topicos = [];
        let legends = {};

        // Parse data
        data.forEach( d => {

          // Set scales
          let scaleTopPalavras = d3.scaleLinear().domain(d3.extent(d.top_palavras, t => t[1])).range([12,25]);
          let scaleFrequenciaEixos = d3.scaleLinear().domain(d3.extent(d.frequencia_eixos, t => t[1])).range([12,30]);

          // Store legends
          d.frequencia_eixos.forEach( e => legends[e[0]] = component.get('colorsEixos')(e[0]) );

          // Add topics
          topicos.push({
            element: d,
            eixos: d.frequencia_eixos.map(function(f) { return { id: f[0], height: scaleFrequenciaEixos(f[1]), mTop: scaleFrequenciaEixos.domain()[1] - scaleFrequenciaEixos(f[1]), bg_color: component.get('colorsEixos')(f[0]) }; }),
            top_palavras: d.top_palavras.map(function(p) { return { id: d.topico_id, name: p[0], value: scaleTopPalavras(p[1]) }; })
          });
        });

        // Set data
        component.set('tableData', topicos);
        component.set('legends', legends);

        //// Draw visualization
        //component._var = gViz.vis.topicos()
        //  ._var(component._var)
        //  .container(".gViz-wrapper[data-id='"+component.get('_id')+"']")
        //  .data(data)
        //  .build();

      },

      // Hide loading div and render error
      error() { gViz.helpers.loading.hide(); console.log("Error"); },

      // Hide loading div and render complete
      complete() { gViz.helpers.loading.hide(); }
    });

  },

  //willRender: function(){
  //  this.drawTable();
  //}

  didInsertElement: function(){
    this.drawTable();
  },

  actions: {

  }

});
