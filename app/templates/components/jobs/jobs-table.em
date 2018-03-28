table.table.table-hover
  thead
    tr
      th.checkbox
        label.btn.btn-secondary.check class={selectAll} click=toggleSelect
          i.mdi.mdi-check
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
          = t 'tables.name'
        if (eq sort 'name')
          if asc
            i.mdi.mdi-arrow-down
          else
            i.mdi.mdi-arrow-up
      th.status
        span
          = t 'tables.status'
      th.time
        = bs-dropdown as |dd|
          = dd.button
            = t (concat 'tables.' timeProperties.selected)
          = dd.menu as |menu|
            each timeProperties.options as |property|
              = menu.item
                a.dropdown-item href='#' click={sortFromDropdown property 'asc'}
                  = t (concat 'tables.' property)
        if (eq sort 'created')
          if asc
            i.mdi.mdi-arrow-down
          else
            i.mdi.mdi-arrow-up
        if (eq sort 'finished')
          if asc
            i.mdi.mdi-arrow-down
          else
            i.mdi.mdi-arrow-up
      th.delete
  .body-wrapper
    tbody
      each model as |job|
        tr
          td.checkbox
            label.btn.btn-secondary.check class={job.selected} click={selectSingle job}
              i.mdi.mdi-check
          td.id
            = link-to 'home.jobs.show' job.id
              = job.id
          td.name
            = link-to 'home.jobs.show' job.id
              = job.name
          td class={concat '__status' job.status}
            = link-to 'home.jobs.show' job.id class="job" class=job.status
              i.__icon
              h4
                = t job.status
          td.time
            if (eq timeProperties.selected 'created')
              = format-date job.created
            else
              if job.finished
                = format-date job.finished
              else
                = job.status
          td.delete
            i.mdi.mdi-delete click={toggleDeleteModal job}
