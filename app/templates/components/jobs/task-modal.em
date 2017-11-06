= bs-modal open=taskModal backdrop=false backdropClose=true class="logger-modal" fade=false onHidden=(action 'close') as |modal|
    modal.header
      h4.modal-title
        i.fa.fa-lg class=selectedTask.operation.icon
          selectedTask.name
      i.fa.fa-lg class={selectedTask.step.status}
    modal.body
      = bs-tab id='tabs' customTabs=true fade=false activeId=activeTab onChange=(action 'activateTab') as |tab|
        = bs-nav type='tabs' as |nav|
          if selectedTask.result
            = nav.item active=(bs-eq tab.activeId 'results')
              a href='#results' class="nav-link" role="tab" onclick={action tab.select "results"} Results
          if selectedTask.logs
            = nav.item active=(bs-eq tab.activeId 'logs')
              a href='#logs' class="nav-link" active={bs-eq tab.activeId 'logs'} role="tab" onclick={action tab.select "logs"} Logs
          if selectedTask.tables
            = nav.item active=(bs-eq tab.activeId 'tables')
              a href='#tables' class="nav-link" role="tab" onclick={action tab.select "tables"} Tables
          if selectedTask.params
            = nav.item active=(bs-eq tab.activeId 'params')
              a href='#params' class="nav-link" role="tab" onclick={action tab.select "params"} Parameters
        .tab-content
          = tab.pane id='results' title="Results"
            p
              selectedTask.result.title
              // fix height da visu
              if selectedTask.result
                = visualizations/vis-wrapper viz=viz dataUrl=dataUrl class="visualization-modal"
          = tab.pane id='logs' title="Logs"
            each selectedTask.logs as |log|
              p class={log.status}
                log.message
          = tab.pane id='tables' title="Tables"
            #tableAccordion role="tablist"
              = each selectedTask.tables as |table|
                .card
                  .card-header id={concat 'tableHeading' table.id} role="tab"
                    h5.mb-0
                      a data-toggle="collapse" href={concat "#table" table.id} aria-expanded="true" aria-controls={concat "table" table.id} = table.title
                  .collapse.show id={concat "table" table.id} role="tabpanel" aria-labelledby={concat 'tableHeading' table.id} data-parent="#tableAccordion"
                    .card-body
                      == table.message
          = tab.pane id='params' title="Parameters"
            = each selectedTask.params.fields as |field|
              .form-inline
                label = field.label
                = component (concat 'forms/form-' field.suggested_widget) class='component-inline' currentValue=(get (get selectedTask.forms field.name) 'value') name=field.name field=field

