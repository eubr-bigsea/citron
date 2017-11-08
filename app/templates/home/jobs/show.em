.container-fluid.toggled#job-diagram-container-wrapper
  .job-option-bar.row
    .col-xs-12.col-md-6.col-lg-6.col-xl-4.job-name
      h3.title: job.workflow.name
    .col-xs-12.col-md-6.col-lg-6.col-xl-2.status#job-status class=job.status
      span.status-icon
      span.text: t job.status
    .col-sm-12.col-xl-6.buttons
      a.log.btn.btn-primary.btn-md click={action 'toggleModalCode'}
        i.fa.fa-lg.fa-code
        span: t 'job.show.code'
      link-to 'home.workflows.draw' job.workflow.id class="workflow btn btn-primary btn-md"
        i.fa.fa-lg.fa-flask
        span: t 'job.show.workflow'
      if job.isRunning
        a.btn.btn-primary.btn-md.stop click={action 'stopJob'}
          i.fa.fa-stop
          span: t 'job.show.stop'
  .job-draw#job-container-diagram
    .lemonade-container#lemonade-container
      jobs/job-draw .lemonade.col-xs-12#lemonade-diagram selectTask=(action 'selectTask')  job=job selectedTask=selectedTask
    button.log.btn.btn-primary#log-trigger click={action "toggleLog"}
      i class="fa fa-angle-right arrow"
    jobs/job-logger #job-logger tasks=job.workflow.tasks steps=job.steps taskModal=taskModal selectedTask=selectedTask activeTab=activeTab
jobs/task-modal taskModal=taskModal selectedTask=selectedTask jobId=job.id activeTab=activeTab
jobs/source-code-modal .source-code-modal modal=modalCode content=codeContent jobId=job.id

