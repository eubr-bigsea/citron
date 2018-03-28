table.table.table-sm.table-striped
  thead
    tr
      th.center.remove-attr
      th.center: = t 'tables.name'
      th.center: = t 'tables.type'
      th.center: = t 'tables.size'
      th.center: = t 'tables.scale'
      th.center title={t 'datasources.edit.helpers.precision'}
        = t 'tables.precision'
        i.mdi.mdi-help
      th.center title={t 'datasources.edit.helpers.treat_as_missing'}
        = t 'tables.treat_as_missing'
        i.mdi.mdi-help
      th.center title={t 'datasources.edit.helpers.nullable'}
        = t 'tables.nullable'
        i.mdi.mdi-help
  tbody
    each attributes as |attr|
      = datasources/attribute-item attr=attr removeAttr=(action 'removeAttr')
.footer
  button.btn.btn-primary.add-attr click={action 'addAttr'}
    i.mdi.mdi-plus
    = t 'datasource.edit.addAttrButton'
