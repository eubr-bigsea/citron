table.table.table-hover
  thead
    tr
      //th.checkbox
        label.btn.btn-secondary.check class={selectAll} click=toggleSelect
          i.mdi.mdi-check
      //th.logo
      th.id click={sortBy 'id'}
        span #
        if (eq sort 'id')
          if asc
            i.mdi.mdi-arrow-down
          else
            i.mdi.mdi-arrow-up
      th.name click={sortBy 'name'}
        span: = t 'tables.name'
        if (eq sort 'title')
          if asc
            i.mdi.mdi-arrow-down
          else
            i.mdi.mdi-arrow-up
      th.author click={sortBy 'user.name'}
        span: = t 'tables.author'
        if (eq sort 'user.name')
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
      //th.delete
  .body-wrapper
    tbody
      each dashboards as |dashboard|
        tr
          //td.checkbox
            label.btn.btn-secondary.check class={dashboard.selected} click={selectSingle dashboard}
              i.mdi.mdi-check
          //td.logo
            = link-to 'home.dashboards.show' dashboard.id
              img src='/assets/images/#{dashboard.image}'
          td.id
            = link-to 'home.dashboards.show' dashboard.id
              = dashboard.id
          td.name
            = link-to 'home.dashboards.show' dashboard.id
              = dashboard.title
          td.author
            = link-to 'home.dashboards.show' dashboard.id
              = dashboard.user.name
          td.time
            = link-to 'home.dashboards.show' dashboard.id
              = format-date (get dashboard timeProperties.selected) locale=locale
          //td.delete
            i.mdi.mdi-delete click={toggleDeleteModal dashboard}
