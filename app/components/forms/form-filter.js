import Ember from 'ember';

var leiStructure = {
  text: 'Tudo',
  li_attr: {class: 'category'},
  a_attr: {class: 'category'},
  icon: 'fa fa-align-left',
  children: [
    { text: 'Capítulo',
      li_attr: {class: 'category'},
      a_attr: {class: 'category'},
      icon: 'fa fa-align-left',
      children: [
        { text: 'Artigo',
          icon: 'fa fa-align-left',
          li_attr: {class: 'category'},
          a_attr: {class: 'category'},
          children: [
            { text: 'Caput',
              icon: 'fa fa-align-left',
              li_attr: {class: 'category'},
              a_attr: {class: 'category'},
              children: [
                {text: 'Inciso',
                  li_attr: {class: 'category'},
                  a_attr: {class: 'category'},
                  icon: 'fa fa-align-left'},
                {text: 'Alínea',
                  li_attr: {class: 'category'},
                  a_attr: {class: 'category'},
                  icon: 'fa fa-align-left',}
              ]
            },
            { text: 'Parágrafo',
              icon: 'fa fa-align-left',
              li_attr: {class: 'category'},
              a_attr: {class: 'category'},
              children: [
                {text: 'Inciso',
                  li_attr: {class: 'category'},
                  a_attr: {class: 'category'},
                  icon: 'fa fa-align-left'},
                {text: 'Alinea',
                  li_attr: {class: 'category'},
                  a_attr: {class: 'category'},
                  icon: 'fa fa-align-left'}
              ]
            }
          ]
        }
      ]
    }
  ]
};

var qbJson = {
  filters: [{
    id: 'term',
    label: 'Term',
    type: 'string',
    operators: ['equal', 'not_equal', 'contains'],
  }],
  default_filter: 'term',
  lang_code: 'en',
  icons:{
    add_group: 'fa fa-plus',
    add_rule: 'fa fa-plus',
    remove_group: 'fa fa-minus',
    remove_rule: 'fa fa-minus',
    error: 'fa fa-exclamation-triangle'
  }
};

var jstreeJson = {
  plugins : ['checkbox'],
  core: {
    data: leiStructure,
    themes: {
      name: 'proton',
      responsive: true}
  },
};

export default Ember.Component.extend({
  classNames: ['filter', 'queryBuilder'],

  makeExpression(jsonQuery){
    var expression = "";
    var groupElems = [];
    var operationsHash = {not_equal: "NOT ", equal: "", contains: "CONTAINS ", AND: " AND ", OR: " OR "};

    jsonQuery.rules.forEach((elem) => {
      if(elem.condition){  groupElems.push(`( ${this.makeExpression(elem)} )`); }
      else{  groupElems.push(`${operationsHash[elem.operator]}${elem.value}`); }
    });

    expression = groupElems.join(`${operationsHash[jsonQuery.condition]}`);
    return expression;
  },

  makeJSON(receivedQuery){
    var fixedQuery = receivedQuery.replace(/\(/g," ( ")
      .replace(/\)/g," ) ")
      .replace(/ and /g, " AND ")
      .replace(/ or /g, " OR ")
      .replace(/ contains /g, " CONTAINS ")
      .replace(/ not /g, " NOT ");
    var tail, i;
    var temp = "", operator;
    var json = { condition : 'AND',  rules: [] };
    var splitted = fixedQuery.split(" ");

    for(i = 0; i < splitted.length; i++) {
      if(splitted[i] == null){}
      else if(splitted[i] === "AND"){  json.condition = 'AND';  }
      else if(splitted[i] === "OR"){ json.condition = 'OR';  }
      else if(splitted[i] === "("){
        tail = splitted.slice(i+1).join(" ");
        var returnedArr = this.makeJSON(tail);
        json.rules.push(returnedArr[0]);
        i += returnedArr[1];
      }
      else if(splitted[i] === ")"){  return [json, i+1];  }
      else{
        if(temp === ""){
          if(splitted[i] === 'CONTAINS'){
            operator = 'contains';
            temp = splitted[i+1];
            i = i+1;
          }  else if (splitted[i] === 'NOT'){
            operator = 'not_equal';
            temp = splitted[i+1];
            i = i+1;
          }  else {
            operator = 'equal';
            temp = splitted[i];
          }
        }  else { temp = temp + " " + splitted[i];  }
        if((splitted[i+1] === 'AND' || splitted[i+1] === 'OR' || splitted[i+1] == null || splitted[i+1] === ')') && temp !== ''){
          json.rules.push({
            id: 'term',
            field: 'term',
            type: 'string',
            input: 'text',
            operator: operator,
            value: temp
          });
          temp = "";
        }
      }
    }
    return [json, i];
  },

  didInsertElement() {
    Ember.$(`#${this.elementId} .filter`).queryBuilder(qbJson);
    Ember.$(`#${this.elementId} .categories`).jstree(jstreeJson);
  },

  actions: {
    makeQueryBuilder(){
      var expression = Ember.$(".query.text").val();
      var json = this.makeJSON(expression)[0];
      Ember.$(`#${this.elementId} .filter`).queryBuilder('setRules', json);
    },
    getQueryText() {
      var json = Ember.$(`#${this.elementId} .filter`).queryBuilder('getRules');
      var expression = this.makeExpression(json);
      Ember.$(".query.text").val(expression);
    }
  }
});
