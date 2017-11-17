each job.workflow.tasks as |task|
  = jobs/job-task status=task.step.status jsplumb=jsplumb task=task selectTask=selectTask
