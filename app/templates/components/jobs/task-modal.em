= bs-modal open=taskModal backdrop=false backdropClose=true class="logger-modal" fade=false onHidden=(action 'close') as |modal|
    modal.header
      h4.modal-title
        i.fa.fa-lg class=selectedTask.operation.icon
          selectedTask.name
      i.fa.fa-lg class={selectedTask.step.status}
    modal.body
      = bs-tab fade=false as |tab|
        if selectedTask.result
          = tab.pane id='results' title="Results"
            p
              selectedTask.result.title
              // fix height da visu
              = visualizations/vis-wrapper viz=viz dataUrl=dataUrl class="visualization-modal"
        if selectedTask.logs
          = tab.pane id='logs' title="Logs"
            each selectedTask.logs as |log|
              p class={log.status}
                log.message
        if selectedTask.tables
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
        if selectedTask.params
          = tab.pane id='params' title="Parameters"
            = each selectedTask.params.fields as |field|
              .form-inline
                label = field.label
                = component (concat 'forms/form-' field.suggested_widget) class='component-inline' currentValue=(get (get selectedTask.forms field.name) 'value') name=field.name field=field

