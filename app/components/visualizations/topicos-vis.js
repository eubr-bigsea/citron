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

          let scale = d3.scaleLinear().domain(d3.extent(d.top_palavras, t => t[1])).range([12,25]);
          topicos.push([`${d.nome}`,`<div class='gViz-wrapper' data-id='topico-${d.topico_id}'></div>`, d.contagem_comentarios, d.top_palavras.map( p => `<span class='word' style='font-size: ${scale(p[1])}px;'>${p[0]}</span>`).join(" ")]);
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
