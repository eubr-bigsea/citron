.card
  .card-header
    h4.title: = card.title
  .card-block
    table.table.table-sm.table-hover
      thead
        tr
          th: = t 'tables.id'
          th: = t 'tables.name'
          th: = t 'tables.created'
      tbody
        each dashboards as |dashboard|
          tr
            td: = link-to 'home.dashboards.show' dashboard.id
              = dashboard.id
            td: = link-to 'home.dashboards.show' dashboard.id
              = dashboard.title
            td: = format-date dashboard.updated locale=locale format='YYYY-MM-DD' suport='ll'
