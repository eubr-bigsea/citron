table.table.table-hover
  thead
    tr
      th: t 'tables.params.attributes'
      th: t 'tables.params.values'
  tbody
    = each params as |param|
      = param.w
      = component (concat 'forms/' param.component) param=param tagName='tr'
