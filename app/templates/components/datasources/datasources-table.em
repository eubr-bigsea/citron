table.table.table-hover
  thead
    tr
      th.checkbox
        label.btn.btn-secondary.check class={selectAll} click=toggleSelect
          i.mdi.mdi-check
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
      th.options
        span: = t 'tables.options'
      th.author click={sortBy 'user_name'}
        span: = t 'tables.author'
        if (eq sort 'user_name')
          if asc
            i.mdi.mdi-arrow-down
          else
            i.mdi.mdi-arrow-up
      th.size click={sortBy 'size'}
        span: = t 'tables.size'
        if (eq sort 'size')
          if asc
            i.mdi.mdi-arrow-down
          else
            i.mdi.mdi-arrow-up
      th.format click={sortBy 'format'}
        span: = t 'tables.format'
        if (eq sort 'format')
          if asc
            i.mdi.mdi-arrow-down
          else
            i.mdi.mdi-arrow-up
      th.time click={sortBy 'created'}
        span: = t 'tables.created'
        if (eq sort 'created')
          if asc
            i.mdi.mdi-arrow-down
          else
            i.mdi.mdi-arrow-up

      th.delete

  .body-wrapper
    tbody
      each datasources as |datasource|
        tr
          td.checkbox
            label.btn.btn-secondary.check class={datasource.selected} click={selectSingle datasource}
              i.mdi.mdi-check
          td.id
            = link-to 'home.datasources.edit' datasource.id
              = datasource.id
          td.name
            = link-to 'home.datasources.edit' datasource.id
              = datasource.name
          td.options
            a.btn.btn-secondary href={concat limoneroUrl datasource.id endPoint}
              i.mdi.mdi-download
              //study the best way of share resources
            //a.btn.btn-secondary
              i.mdi.mdi-share-variant
          td.author
            = link-to 'home.datasources.edit' datasource.id
              = datasource.user_name
          td.size
            = link-to 'home.datasources.edit' datasource.id
              "#{datasource.estimated_size_in_mega_bytes} MB
          td.format
            = link-to 'home.datasources.edit' datasource.id
              = datasource.format
          td.time
            = link-to 'home.datasources.edit' datasource.id
              = format-date datasource.created locale=locale
          td.delete
            i.mdi.mdi-delete click={toggleDeleteModal datasource}
