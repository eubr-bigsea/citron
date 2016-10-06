export default function groupBy(data, group) {
  return data.then(function(rawData) {
    let el = {};

    rawData.forEach(function(o) {
      let cat = o.get(group).filter(e => e.type === 'parent')[0];
      let name = cat === undefined ? 'Others' : cat.name;

      if(el[name] === undefined) {
        el[name] = [];
      }

      el[name].push(o);
    });
    return el;
  });
}
