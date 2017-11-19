import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { set } from '@ember/object';

export default Component.extend({
  store: service(),
  text: ['decimal', 'integer', 'lookup', 'percentage', 'range','text', 'textarea'],
  multi: ['tag', 'attribute-selector'],

  didReceiveAttrs(){
    this._super(...arguments);
    let fields = this.get('fields');
    let forms = this.get('forms');
    if(fields && forms){
      var params = A();
      fields.forEach((field) => {
        var el = {};
        var w = field.suggested_widget;
        el.name = field.name;
        el.label = field.label;
        el.value = forms[field.name].value;
        el.w = w;
        el.component = 'display-form-text';
        if(w === 'lookup'){
          this.get('store').findRecord('datasource', el.value).then((datasource) => {
            var aux = params.findBy('name', field.name);
            set(aux, 'value', datasource.get('name'));
          });
        } else if(w === 'dropdown'){
          if(el.value){
            var i = parseInt(el.value);
            if(i){
              el.value = JSON.parse(field.values).findBy('key', i).value;
            } else {
              el.value = JSON.parse(field.values).findBy('key', el.value).value;
            }
          }
        } else if(w === 'expression'){
          if(el.value){
            el.value = JSON.parse(el.value).expression;
          }
          el.component = 'display-form-text';
        } else if(w === 'select2'){
          if(el.value){
            el.value = el.value.value
          }
        } else if(this.get('multi').includes(w)){
          if(el.value){
            el.value = el.value.join(', ');
          }
        } else if(!this.get('text').includes(w)){
          el.component = 'display-form-' + w;
        }
        params.pushObject(el);
      })
      this.set('params', params);
    }
  }
});
