td: b: = param.label
td.values
  table.table.table-sm
    thead
      tr
        th Attr
        th Func
        th Alias
    tbody
      each param.value as |el|
        tr
          td: = el.attribute
          td: = el.f
          td: = el.alias
