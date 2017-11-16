import Component from '@ember/component';
import { inject as service } from '@ember/service';
//case [text, code
export default Component.extend({
  store: service(),
  text: ['decimal', 'integer', 'lookup', 'percentage', 'range','text', 'textarea'],
  multi: ['select2', 'tag', 'attribute-selector'],

  didReceiveAttrs(){
    this._super(...arguments);
    let fields = this.get('fields');
    let forms = this.get('forms');
    if(fields && forms){
      var params = Ember.A();
      fields.forEach((field) => {
        var el = {};
        var w = field.suggested_widget;
        el.name = field.name;
        el.label = field.label;
        el.value = forms[field.name].value;
        el.w = w;
        if(w === 'lookup'){
          el.component = 'display-form-text';
          this.get('store').findRecord('datasource', el.value).then((datasource) => {
            var aux = params.findBy('name', field.name);
            Ember.set(aux, 'value', datasource.get('name'));
          });
        } else if(this.get('text').includes(w)){
          el.component = 'display-form-text';
        } else if(this.get('multi').includes(w)){
          if(el.value){
            el.value = el.value.join(', ');
          }
          el.component = 'display-form-text';
        } else {
          el.component = 'display-form-' + w;
        };
        params.pushObject(el);
      })
      console.log('params',params);
      this.set('params', params);
    }
  }
});
