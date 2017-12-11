.card
  .card-header
    .header-block
      h3.title: = card.title
  .card-block#large-table-jobs
    table.table.table-hover
      thead
        tr
          th: = t 'tables.id'
          th: = t 'workflow'
          th: = t 'tables.status'
          th: = t 'tables.result'
      tbody
        each jobs as |job|
          = cards/item-list-jobs job=job
