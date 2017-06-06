export default function groupBy(data, group) {
  return data.then(function(rawData) {
    let el = {};
     let types = {
      "subgroup": 2,
      "group": 1
    };
    let others = ["technology", "model", "service", "data source", "algorithm"];

      var allTypes = []
    rawData.forEach(function(o) {
      let myEl = el;
      o.get(group).filter((a) => others.indexOf(a.type) === -1 )
        .sort((a, b) => types[a.type] - types[b.type])
        .forEach((e) => {
        if(e.type !== 'group' && e.type !== 'subgroup'){
        allTypes.push(e.type);
        }
          if(!myEl[e.name]) {
            myEl[e.name] = {}
          }
          myEl = myEl[e.name];
        });

      if(!myEl['_data']) {
        myEl['_data'] = [];
      }
      myEl['_data'].push(o);
    });
    return el;
  });
}
