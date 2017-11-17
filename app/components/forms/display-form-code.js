import Component from '@ember/component';

export default Component.extend({
  actions: {
    download(){
      let data = this.get('param.value');
      var blob = new Blob([data],{type: 'text'});
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      if(data.includes('Python')){
        link.download = "code.py";
      } else {
        link.download = "code"
      }
      link.click();
    }
  }
});
