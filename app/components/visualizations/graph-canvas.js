import Ember from 'ember';

//let chart_data = JSON.parse('{"nodes":[{"id":"0101030010","name":"VISITA DOMICILIAR POR PROFISSIONAL DE NÍVEL MÉDIO","attrs":{"id":"0101030010","grupo":"Ações de promoção e prevenção em saúde","sub_grupo":"Ações coletivas/individuais em saúde","forma_organizacao":"Visita domiciliar","nome":"VISITA DOMICILIAR POR PROFISSIONAL DE NÍVEL MÉDIO"},"metric":2,"group":"sciences","neighbours":null,"community":0, "neighbours": {}},{"id":"0101030029","name":"VISITA DOMICILIAR/INSTITUCIONAL POR PROFISSIONAL DE NÍVEL SUPERIOR","attrs":{"id":"0101030029","grupo":"Ações de promoção e prevenção em saúde","sub_grupo":"Ações coletivas/individuais em saúde","forma_organizacao":"Visita domiciliar","nome":"VISITA DOMICILIAR/INSTITUCIONAL POR PROFISSIONAL DE NÍVEL SUPERIOR"},"metric":3,"group":"sciences","neighbours":null,"community":0, "neighbours": {}},{"id":"0101040024","name":"AVALIAÇÃO ANTROPOMÉTRICA","attrs":{"id":"0101040024","grupo":"Ações de promoção e prevenção em saúde","sub_grupo":"Ações coletivas/individuais em saúde","forma_organizacao":"Alimentação e nutrição","nome":"AVALIAÇÃO ANTROPOMÉTRICA"},"metric":3,"group":"sciences","neighbours":null,"community":0, "neighbours": {}}],"links":[{"source":"0101030010","target":"0101030029","value":0.700667,"weight":7},{"source":"0101030010","target":"0101040024","value":0.697455,"weight":8},{"source":"0101030029","target":"0101040024","value":0.8453,"weight":7},{"source":"0101040024","target":"0101030029","value":0.8453,"weight":7}]}');

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
  },

  // Attributes bingins
  dataUrl: function(){ return this.get('dataUrl'); }.property('dataUrl'),
  width:  function(){ return this.get('width'); }.property('width'),
  height: function(){ return this.get('height'); }.property('height'),
  _id:    function(){ return this.get('_id'); }.property('_id'),
  style:  function(){ return "width:"+this.get('width')+"; height:"+this.get('height')+";"; }.property('style'),

  // Chart var
  _var: null,

  // Draw Chart
  draw: function(){

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

        // Draw visualization
        component._var = gViz.vis.graph()
          ._var(component._var)
          .container(".gViz-wrapper[data-id='"+component.get('_id')+"']")
          .data(data)
          .build();

      },

      // Hide loading div and render error
      error() { gViz.helpers.loading.hide(); console.log("Error"); },

      // Hide loading div and render complete
      complete() { gViz.helpers.loading.hide(); }
    });

  },

  didInsertElement: function(){
    this.draw();
  }
});
