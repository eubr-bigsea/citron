.header-wrapper
  span: = t 'datasources.upload-modal.uploading-header' fileName=file.fileName
  .buttons.pull-right
    if (eq status 'paused')
      button.btn.btn-secondary click={action 'retry'}
        i.mdi.mdi-play
    else
      button.btn.btn-secondary click={action 'pause'}
        i.mdi.mdi-pause
    button.btn.btn-secondary click={action 'cancel'}
      i.mdi.mdi-stop
.progress-wrapper
  i.mdi.mdi-paused
  = ember-progress-bar progress=progress.value class='progress'
  span.percentage: = progress.rounded
