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
          th: = t 'tables.status'
          th: = t 'tables.started'
      tbody
        each jobs as |job|
          tr
            td.__status class=job.status
              i.__icon.big
            td: = link-to 'home.jobs.show' job.id
              = job.id
            td: = link-to 'home.jobs.show' job.id
              = job.workflow.name
            td.__status class=job.status
              i.__icon
              span.__text: t job.status
            td: = format-date job.created locale=locale format='YYYY-MM-DD' suport='ll'
