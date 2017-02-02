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
  colorsEixos:  d3.scaleOrdinal(d3.schemeCategory10),

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

        // Parse data
        let topicos = [];
        data.forEach( d => {

          let scaleTopPalavras = d3.scaleLinear().domain(d3.extent(d.top_palavras, t => t[1])).range([12,25]);
          let scaleFrequenciaEixos = d3.scaleLinear().domain(d3.extent(d.frequencia_eixos, t => t[1])).range([12,30]);
          topicos.push([
            `<a href='http://200.131.6.30/projeto/dadosparciais/dataset/130/calaca/topico_id:${d.topico_id}' target='_blank'>${d.nome}</a>`,
            d.frequencia_eixos.map( f => `<a class='bar' href='http://200.131.6.30/projeto/dadosparciais/dataset/130/calaca/commentable_axis:${f[0]}' target='_blank' style='height: ${scaleFrequenciaEixos(f[1])}px; margin-top: ${scaleFrequenciaEixos.domain()[1] - scaleFrequenciaEixos(f[1])}px; background-color: ${component.get('colorsEixos')(f[0])};'></a>`).join(' '),
            d.contagem_comentarios,
            d.top_palavras.map( p => `<a href='http://200.131.6.30/projeto/dadosparciais/dataset/130/calaca/comment_text.acento:imediata AND topico_id:${d.topico_id}' target='_blank' class='word' style='font-size: ${scaleTopPalavras(p[1])}px;'>${p[0]}</a>`).join(" ")
          ]);
        });

        // Set data
        component.set('tableData', topicos);

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
  }

});
