= bs-modal class=componentCssClassName open=executionModal backdropClose=true fade=fade backdrop=false onHidden=(action (mut executionModal) false) as |modal|
  modal.header
    h4.modal-title.vcentered
     i.mdi.mdi-lan
     span.text: t 'workflows.pre-execution-modal.title'
  modal.body
    p: t 'workflows.pre-execution-modal.message'
    br
    label: t 'workflows.pre-execution-modal.name.label'
    = input value=jobHash.name

    label: t 'workflows.pre-execution-modal.cluster.label'
    select onchange={action (mut jobHash.cluster.id) value="target.value"}
      each clusters as |cl|
        option value={cl.id} selected={eq jobHash.cluster.id cl.id}
          = cl.name
  modal.footer
    = bs-button onClick=executeWorkflow
      t 'workflows.pre-execution-modal.runBtn'
    = bs-button onClick=(action (mut executionModal) false)
      t 'workflows.pre-execution-modal.cancel'
