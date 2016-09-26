export default function groupByCategory(data) {
  return data.then(function(rawData) {
    let el = {};

    rawData.forEach(function(o) {
      let cat = o.get('categories').filter(e => e.type === 'parent')[0];
      let name = cat === undefined ? 'Others' : cat.name;

      if(el[name] === undefined)
        el[name] = [];

      el[name].push(o);
    });
    return el;
  });
}
