.container-fluid.__job__show.toggled
  .option-bar.row
    .col-xs-12.col-md-7.col-lg-8.col-xl-5.vcentered.__name
      h3.title: job.workflow.name
    .col-xs-12.col-md-5.col-lg-4.col-xl-3.vcentered.__status class=job.status click={action 'toggleReportModal'}
      i.__icon
      span.__text: t job.status
    .col-sm-12.col-xl-4.vcentered.__buttons
      a.btn.btn-primary click={action 'toggleCodeModal'}
        i.fa.fa-lg.fa-code
        span: t 'job.show.code'
      = link-to 'home.workflows.draw' job.workflow.id class="btn btn-primary"
        i.fa.fa-lg.fa-flask
        span: t 'job.show.workflow'
      if job.isRunning
        a.btn.btn-primary.__stop click={action 'stopJob'}
          i.fa.fa-stop
          span: t 'job.show.stop'
  .draw-wrapper
    .draw-container#draw-container
     = jobs/job-draw  selectTask=(action 'selectTask')  job=job selectedTask=selectedTask
    button.btn.btn-primary.__toggle-log click={action "toggleLog"}
      i.arrow
    = jobs/job-logger id='job-logger' tasks=job.workflow.tasks steps=job.steps taskModal=taskModal selectTask=(action 'selectTask')
= jobs/task-modal taskModal=taskModal selectedTask=selectedTask jobId=job.id activeTab=activeTab activateTab=(action 'activateTab')
= jobs/code-modal codeModal=codeModal code=code jobId=job.id
= jobs/report-modal reportModal=reportModal message=job.status_text status=job.status
