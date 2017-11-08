.log
  i.fa.fa-list-ul: span Job's Log
.logger-list-wrapper
  ul.tasks-list#tasks-list
    each tasks as |task|
      li.step-log
        a href="#"
          i.fa.fa-lg class=task.operation.icon
          span
            task.name
          i.pull-right.job-status class=task.step.status
        ul
          li
            if task.result
              a click={action 'openModal' task 'result'}
                i.fa.fa-dashboard
            if task.tables
              a click={action 'openModal' task 'tables'}
                i.fa.fa-table
            if task.logs
              a click={action 'openModal' task 'logs'}
                i.fa.fa-list-ul
            if task.params
              a click={action 'openModal' task 'params'}
                i.fa.fa-pencil-square-o

