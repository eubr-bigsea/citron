table.table.table-hover
  thead
    tr
      th.checkbox
        label.btn.btn-secondary.check class={selectAll} click=toggleSelect
          i.mdi.mdi-check
      th.logo
      th.id click={sortBy 'id'}
        span #
        if (eq sort 'id')
          if asc
            i.mdi.mdi-arrow-down
          else
            i.mdi.mdi-arrow-up
      th.name click={sortBy 'name'}
        span: = t 'tables.name'
        if (eq sort 'name')
          if asc
            i.mdi.mdi-arrow-down
          else
            i.mdi.mdi-arrow-up
      th.author click={sortBy 'user_name'}
        span: = t 'tables.author'
        if (eq sort 'user_name')
          if asc
            i.mdi.mdi-arrow-down
          else
            i.mdi.mdi-arrow-up
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
        if (eq sort 'updated')
          if asc
            i.mdi.mdi-arrow-down
          else
            i.mdi.mdi-arrow-up
      th.delete
  .body-wrapper
    tbody
      each workflows as |workflow|
        tr
          td.checkbox
            label.btn.btn-secondary.check class={workflow.selected} click={selectSingle workflow}
              i.mdi.mdi-check
          td.logo
            = link-to 'home.workflows.draw' workflow.id
              img src='/assets/images/#{workflow.image}'
          td.id
            = link-to 'home.workflows.draw' workflow.id
              = workflow.id
          td.name
            = link-to 'home.workflows.draw' workflow.id
              = workflow.name
          td.author
            = link-to 'home.workflows.draw' workflow.id
              = workflow.user.name
          td.time
            = link-to 'home.workflows.draw' workflow.id
              = format-date (get workflow timeProperties.selected) locale=locale
          td.delete
            i.mdi.mdi-delete click={toggleDeleteModal workflow}
          td.delete
            i.mdi.mdi-download click={action 'downloadWorkflow' workflow}
