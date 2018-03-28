= bs-modal class=componentCssClassName open=executionModal backdropClose=true fade=fade backdrop=false onHidden=(action (mut executionModal) false) as |modal|
  modal.header
    h4.modal-title.vcentered
     i.mdi.mdi-lan
     span.text: t 'workflows.pre-execution-modal.title'
  modal.body
    p: t 'workflows.pre-execution-modal.message'
    label: t 'workflows.pre-execution-modal.name.label'
    = input value=jobHash.name class="form-control"
    br
    label: t 'workflows.pre-execution-modal.cluster.label'
    select onchange={action (mut jobHash.cluster.id) value="target.value"} class="form-control"
      each clusters as |cl|
        option value={cl.id} selected={eq jobHash.cluster.id cl.id}
          = cl.name
  modal.footer
    = bs-button onClick=executeWorkflow class="btn-success"
      t 'workflows.pre-execution-modal.runBtn'
    = bs-button onClick=(action (mut executionModal) false)
      t 'workflows.pre-execution-modal.cancel'
