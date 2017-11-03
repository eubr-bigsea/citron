.container-fluid.toggled#job-diagram-container-wrapper
  jobs/option-bar .job-option-bar.row  job=model.job
  .job-draw#job-container-diagram
    .lemonade-container#lemonade-container
      jobs/job-draw .lemonade.col-xs-12#lemonade-diagram selectTask=(action 'selectTask')  job=job selectedTask=selectedTask
    jobs/job-logger #job-logger job=job stepsLogs=stepsLogs operations=operations
jobs/task-modal taskModal=taskModal selectedTask=selectedTask jobId=job.id

