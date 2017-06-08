export default function groupBy(data, group) {
  return data.then(function(rawData) {
    let el = {};
    let types = { subgroup: 2, group: 1 };
    let others = ["technology", "model", "service", "data source", "algorithm"];

    var groups = []

    rawData.forEach(function(o) {
      let myEl = el;
      o.get(group).filter((a) => others.indexOf(a.type) === -1 )
        .sort((a, b) => types[a.type] - types[b.type])
        .forEach((e) => {
          if(!myEl[e.name]) {
            myEl[e.name] = {}
            groups.push(e.name)
          }
          myEl = myEl[e.name];
        });

      if(!myEl['_data']) {
        myEl['_data'] = [];
      }
      myEl['_data'].push(o);
    });

    var func = function(el){
      var newArray = []

      Object.keys(el).forEach(function(key){
        var o = {}
        o[key] = el[key]
        newArray.push(o);
      });

      newArray = newArray.sort((a, b) => {
        var nameA = Object.keys(a)[0];
        var nameB = Object.keys(b)[0];
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      return newArray;
    }
    groups = func(el);
    groups.forEach(function(o){
      Object.keys(o).forEach(function(obj){
        if(o[obj].constructor.name === 'Object'){
          o[obj] = func(o[obj]);
        }
      });
    });
    return groups;
  });
}
