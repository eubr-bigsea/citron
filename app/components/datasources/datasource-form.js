import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    setDataType(type){
      this.datasource.data_type = type;
    },
    setDataFormat(format){
      this.datasource.data_format = format;
    },
  },
});
