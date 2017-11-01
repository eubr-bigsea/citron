= bs-modal open=taskModal backdrop=false backdropClose=true class="logger-modal" fade=false onHidden=(action (mut taskModal) false) as |modal|
    modal.header
      h4.modal-title
        i.fa.fa-lg class=selectedTask.operation.icon
          selectedTask.name
      i.fa.fa-lg class={selectedTask.step.status}
    modal.body
      = bs-tab fade=false activeId='results' as |tab|
        = tab.pane id='results' title="Results"
          p "vreu vreu vreu
        = tab.pane id='logs' title="Logs"
          each selectedTask.step.logs as |log|
            if (eq log.type 'TEXT')
              p class={log.status}
                log.message
        = tab.pane id='tables' title="Tables"
          each selectedTask.step.logs as |log|
            if (eq log.type 'HTML')
              p class={log.status}
                log.message


