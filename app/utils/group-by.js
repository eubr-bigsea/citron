export default function groupBy(data) {
  const groupBy = function(xs, keySelector) {
    return xs.reduce(function(rv, x) {
      var key = keySelector(x);
      rv.set(key, rv.get(key) || []);
      rv.get(key).push(x);
      return rv;
    }, new Map());
  };
  let ops = data.filterBy("enabled").map(op => {
    const group = op.categories.find(cat => {
      return cat.type === "group";
    }) || { name: "", order: 0, default_order: 0 };
    const subGroup = op.categories.find(cat => {
      return cat.type === "subgroup";
    }) || { name: "", order: 0, default_order: 0 };

    return {
      group: group.name,
      operation: op,
      subGroup: subGroup.name,
      order: group.order,
      default_order: group.default_order,
      subGroupOrder: subGroup.order,
      subGroupDefaultOrder: subGroup.default_order
    };
  });

  ops.sort((a, b) => {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    if (a.default_order < b.default_order) return -1;
    if (a.default_order > b.default_order) return 1;
    const groupCompare = a.group.localeCompare(b.group);
    if (groupCompare != 0) return groupCompare;
    return a.subGroup.localeCompare(b.subGroup);
  });
  let grouped = [...groupBy(ops, x => x.group)].map(item => {
    if (item[1][0].subGroup === "") {
      return {
        group: item[0],
        operations: item[1].sort((a, b) =>
          a.operation.name.localeCompare(b.operation.name)
        )
      };
    } else {
      return {
        group: item[0],
        subGroups: [...groupBy(item[1], x => x.subGroup)]
          .map(subItem => {
            return {
              group: item[0],
              subGroup: subItem[0],
              subGroupOrder: item[1][0].subGroupOrder,
              subGroupDefaultOrder: item[1][0].subGroupDefaultOrder,
              operations: subItem[1].sort((a, b) =>
                a.operation.name.localeCompare(b.operation.name)
              )
            };
          })
          .sort((a, b) => {
            if (a.subGroupOrder < b.subGroupOrder) return -1;
            if (a.subGroupOrder > b.subGroupOrder) return 1;
            if (a.subGroupDefaultOrder < b.subGroupDefaultOrder) return -1;
            if (a.subGroupDefaultOrder > b.subGroupDefaultOrder) return 1;
            return a.subGroup.localeCompare(b.subGroup);
          })
      };
    }
  });
  return grouped;
}
