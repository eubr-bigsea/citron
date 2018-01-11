.card
  .card-header
    h4.title: = card.title
  .card-block
    table.table.table-sm.table-hover
      thead
        tr
          th: = t 'tables.id'
          th: = t 'tables.name'
          th: = t 'tables.options'
          th: = t 'tables.format'
          th: = t 'tables.created'
      tbody
        each datasources as |datasource|
          tr
            td: = link-to 'home.datasources.edit' datasource.id
              = datasource.id
            td: = link-to 'home.datasources.edit' datasource.id
              = datasource.name
            td.icons
              a href={concat limoneroUrl datasource.id endPoint}
                i.fa.fa-lg.fa-download
              = link-to 'home.datasources.edit' datasource.id
                i.fa.fa-lg.fa-pencil
            td: = datasource.format
            td: = format-date datasource.created locale=locale format='YYYY-MM-DD' suport='ll'
