table.table.table-hover
  thead
    tr
      th.id click={sortBy 'id'}
        span
         = t 'tables.id'
        if (eq sort 'id')
          if asc
            i.mdi.mdi-arrow-down
          else
            i.mdi.mdi-arrow-up
      th.name click={sortBy 'name'}
        span
          = t 'workflow.self'
        if (eq sort 'name')
          if asc
            i.mdi.mdi-arrow-down
          else
            i.mdi.mdi-arrow-up
      th.status
        span
          = t 'tables.status'
      th.date
        span
          = t 'tables.started'
      th.date
        span
          = t 'tables.finished'
  .body-wrapper
    tbody
      each model as |job|
        tr
          td.id
            = link-to 'home.jobs.show' job.id
              = job.id
          td.name
            = link-to 'home.jobs.show' job.id
              = job.workflow.name
          td class={concat '__status' job.status}
            = link-to 'home.jobs.show' job.id class="job" class=job.status
              i.__icon
              h4
                = t job.status
          td.date
            = format-date job.created
          td.date
            if job.finished
              = format-date job.finished
            else
              = job.status
