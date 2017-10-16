import Component from '@ember/component';

export default Component.extend({
  actions:{
    setDataType(type){
      this.datasource.data_type = type;
    },
    setDataFormat(format){
      this.datasource.data_format = format;
    },
  },
});
