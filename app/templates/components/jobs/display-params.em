table.table.table-hover
  thead
    tr
      th: t 'tables.attributes'
      th.values: t 'tables.values'
  tbody
    = each params as |param|
      = component (concat 'forms/' param.component) param=param tagName='tr'
