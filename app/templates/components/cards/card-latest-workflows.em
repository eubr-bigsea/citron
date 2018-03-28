.card
  .card-header
    h4.title: = card.title
  .card-block
    table.table.table-sm.table-hover
      thead
        tr
          th
          th: = t 'tables.id'
          th: = t 'tables.name'
          th: = t 'tables.updated'
      tbody
        each workflows as |workflow|
          tr
            td.image: img src={concat "/assets/images/" workflow.image}
            td: = link-to 'home.workflows.draw' workflow.id
              = workflow.id
            td: = link-to 'home.workflows.draw' workflow.id
              = workflow.name
            td: = format-date workflow.updated locale=locale format='YYYY-MM-DD' suport='ll'
