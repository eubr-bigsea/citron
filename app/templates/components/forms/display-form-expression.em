td: b: = param.label
td.values
  table.table.table-sm
    thead
      tr
        th Expression
        th Alias
    tbody
      each param.value as |el|
        tr
          td: = el.expression
          td: = el.alias
