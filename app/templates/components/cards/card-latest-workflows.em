.card
  .card-header
    .header-block
      h3.title: = card.title
  .alert.alert-success#flashSuccess style="display:none"
    span: = t 'alert.delete.workflow.success'
  .alert.alert-danger#flashError style="display:none"
    span: = t 'alert.delete.workflow.error'
  .card-block#large-table-workflows
    table.table.table-hover
      thead
        tr
          th: = t 'tables.id'
          th: = t 'tables.name'
          th: = t 'tables.options'
          th style="text-align: right;": = t 'tables.created'
      tbody
        each workflows as |workflow|
          unless workflow.isDeleted
            = cards/item-list-workflow workflow=workflow locale=locale
