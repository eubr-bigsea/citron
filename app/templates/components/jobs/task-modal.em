= bs-modal class=componentCssClassName open=taskModal backdropClose=true fade=fade onHidden=(action 'close') as |modal|
    modal.header
      h4.modal-title
        i.fa.fa-lg class=selectedTask.operation.icon
        selectedTask.name
      .__status class={selectedTask.step.status}
        i.fa.fa-lg.__icon
        span.__text: t selectedTask.step.status
    modal.body
      = bs-tab id='tabs' customTabs=true fade=false activeId=activeTab onChange=(action 'activateTab') as |tab|
        = bs-nav type='tabs' as |nav|
          if selectedTask.result
            = nav.item active=(bs-eq tab.activeId 'results')
              a href='#results' class="nav-link" role="tab" onclick={action tab.select "results"}
                = t 'jobs.taskModal.results'
          if selectedTask.images
            = nav.item active=(bs-eq tab.activeId 'images')
              a href='#images' class="nav-link" role="tab" onclick={action tab.select "images"}
                = t 'jobs.taskModal.images'
          if selectedTask.logs
            = nav.item active=(bs-eq tab.activeId 'logs')
              a href='#logs' class="nav-link" role="tab" onclick={action tab.select "logs"}
                = t 'jobs.taskModal.logs'
          if selectedTask.tables
            = nav.item active=(bs-eq tab.activeId 'tables')
              a href='#tables' class="nav-link" role="tab" onclick={action tab.select "tables"}
                = t 'jobs.taskModal.tables'
          if selectedTask.params
            = nav.item active=(bs-eq tab.activeId 'params')
              a href='#params' class="nav-link" role="tab" onclick={action tab.select "params"}
                = t 'jobs.taskModal.params'
        .tab-content
          = tab.pane id='results' title="Results"
            if selectedTask.result
              = visualizations/vis-wrapper viz=viz data=data id="display-modal"
          = tab.pane id='images' title="images"
            each selectedTask.images as |image|
              img src={concat "data:image/png;base64," image.message}
          = tab.pane id='logs' title="Logs"
            table.table.table-hover
              thead
                tr
                  th #
                  th: t 'tables.message'
                  th: t 'tables.time'
                  th
              tbody
                each selectedTask.logs as |log|
                  tr
                    td: log.id
                    td: log.message
                    td: = format-date log.date locale=locale
                    td.__status class=log.status
                      i.__icon
          = tab.pane id='tables' title="Tables"
            #tableAccordion role="tablist"
              = each selectedTask.tables as |table|
                .card
                  .card-header id={concat 'tableHeading' table.id} role="tab"
                    h5.mb-0
                      if table.title
                        a data-toggle="collapse" href={concat "#table" table.id} aria-expanded="true" aria-controls={concat "table" table.id} = table.title
                      else
                         a data-toggle="collapse" href={concat "#table" table.id} aria-expanded="true" aria-controls={concat "table" table.id} Table
                  .collapse.show id={concat "table" table.id} role="tabpanel" aria-labelledby={concat 'tableHeading' table.id} data-parent="#tableAccordion"
                    .card-body
                      .table-wrapper id={concat "wrapper" table.id}
                        == table.message
          = tab.pane id='params' title="Parameters"
            = jobs/display-params fields=selectedTask.params.fields forms=selectedTask.forms
