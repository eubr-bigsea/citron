.header click={action 'collapseAll'}
  i.fa.fa-tasks
  span: = t 'job.self'
.logger-list-wrapper
  ul.tasks-list#tasks-list
    each tasks as |task|
      li.task-menu
        a.open-menu
          i.fa.fa-lg class=task.operation.icon
          span: task.name
          i.pull-right.job-status class=task.step.status
        ul
          li
            if task.params
              a title={t 'jobs.taskModal.params'} click={action 'openModal' task 'params'}
                i.fa.fa-pencil-square-o
            if task.logs
              a title={t 'jobs.taskModal.logs'} click={action 'openModal' task 'logs'}
                i.fa.fa-list-ul
            if task.tables
              a title={t 'jobs.taskModal.tables'} click={action 'openModal' task 'tables'}
                i.fa.fa-table
            if task.images
              a title={t 'jobs.taskModal.image'} click={action 'openModal' task 'images'}
                i.fa.fa-picture-o
            if task.result
              a title={t 'jobs.taskModal.result'} click={action 'openModal' task 'results'}
                i.fa.fa-dashboard
