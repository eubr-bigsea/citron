export default {
  'main-sidebar': {
    'home': 'Home',
    'workflows': 'Workflows',
    'jobs': 'Jobs',
    'datasources': 'Datasources',
    'dashboards': 'Dashboards'
  },
  'notFound': {
    'servers': 'Our servers are in maintenance.',
    'moreLemonade': 'We are making more Lemonade for you.',
    'message': 'The {{resource}} that you are looking for is not available',
    'goBack': 'Go back to'
  },
  'task':{
    'tooltip': 'Double click this task to see details',
  },
  //components inside of forms folder
  'form':{
    'title': 'Task Parameters',
    'task': {
      'name': 'Name',
      'helper': 'Task name displayed on diagram',
    },
    'attribute-function': {
      'button': 'Open Editor',
      'modal': {
        'buttons': {
          'add': 'Adicionar',
        },
        'tab': {
          'editor': 'Editor',
          'references': 'References',
        },
        'table': {
          'attribute': 'Attribute',
          'function': 'Function',
          'column': {
            'alias': 'Alias',
            'filter': 'Value',
          }
        }
      },
    },
  },
  //Forms
  'forms': {
    'email': {
      'label': 'Email',
      'placeholder': 'example@email.com'
    },
    'password': {
      'label': 'Password',
      'placeholder': 'Minimum of 6 characters.'
    },
    'passwordConfirmation': {
      'label': 'Confirm password',
      'placeholder': 'Confirm your password.'
    },
    'remember': {
      'label': 'Remember me'
    },
    'name': {
      'label': 'Name',
      'placeholder': 'Your name'
    },
    'firstName': {
      'label': 'First name',
      'placeholder': 'First name'
    },
    'lastName': {
      'label': 'Last name',
      'placeholder': 'Last name'
    },
    'currentPassword': {
      'label': 'Current password',
    },
    'newPassword': {
      'label': 'New password',
    },
    'newPasswordConfirmation': {
      'label': 'Confirm new password',
    },
    'agree': {
      'label': 'I agree with the policy terms'
    },
    'locale': {
      'label': 'Language'
    },
    'description': {
      'label': 'Description',
    },
    'images': {
      'label': 'Images'
    },
    'platform': {
      'label': 'Platform',
    },
    'cluster': {
      'label': 'Clusters',
    },
    'format': {
      'label': 'Format',
    },
    'share': {
      'label': 'Share',
      'label-append': 'Share this {{resource}} with others users',
      'searchFor': 'Search users to share'
    },
    'delimiter': {
      'label': 'Delimiter',
    },
    'quote-char': {
      'label': 'Enclosure',
    },
    'header': {
      'label': 'Header',
    },
    'infer-schema': {
      'label': 'Infer Schema',
    },
    'attributes': {
      'label': 'Attributes',
      'label-append': 'Edit attributes of datasource'
    },
    'public': {
      'label': 'Public',
      'helper': 'This will be public to all users',
    },
    'encode': {
      'label': 'Encode',
    },
    'treat_as_missing': {
      'label': 'Treat as missing',
    },
    'create': 'Create',
    'save': 'Save',
    'cancel': 'Cancel',
    'changePassword': 'Change password',
    'policy': 'Policy',
    'alreadyAccount': 'Already have an account',
    'forgotPassword': 'Forgot your password',
    'noAccount': 'Still dont have an account',
    'signUp': 'Sign up',
    'login': 'Sign in',
    'yourProfile': 'Your profile, ',
    'returnLogin': 'return to Login',
  },
  'tables': {
    'id': '#',
    'logo': 'Logo',
    'name': 'Name',
    'author': 'Author',
    'updated': 'Updated At',
    'status': 'Status',
    'result': 'Result',
    'size': 'Size',
    'format': 'Format',
    'options': 'Options',
    'created': 'Created at',
    'started': 'Started at',
    'finished': 'Finished at',
    'email': 'Email',
    'permission': 'Permisson',
    'type': 'Type',
    'precision': 'Prec',
    'scale': 'Scale',
    'nullable': 'Null',
    'treat_as_missing': 'TaM',
    'description': 'Description',
    'attributes': 'Attributes',
    'values': 'Values',
    'time': 'Time',
    'message': 'Message',
  },
  'cards': {
    'latestEditedWorkflows': {
      'title': 'Latest edited workflows',
    },
    'releaseNotes': {
      'title': 'News - Lemonade ',
      'footer': 'Released at',
    },
    'latestUpdatedJobs': {
      'title': 'Latest updated jobs',
    },
    'videoTutorial': {
      'title': 'Basic Tutorial',
    },
  },
  'alert': {
    'delete': {
      'workflow': {
        'success': 'The workflow was delete.',
        'error': 'There was a error, the workflow was not deleted.'
      },
      'workflows': {
        'success': {
          'one':'The workflow was deleted.',
          'other': 'All {{count}} were deleted.',
        },
        'error': {
          'one': 'Sorry, the workflow could not be deleted.',
          'other': 'Sorry, the workflows {{errors}} could not be deleted.'
        },
      },
      'datasource': {
        'success': 'The datasource was delete.',
        'error': 'There was a error, the datasource was not deleted.'
      },
    },
    'save': {
      'workflow': {
        'success': 'The workflow was successful saved.',
        'error': 'There was a error, the workflow was not saved.'
      }
    },
  },
  'modal': {
    'profile': {
      'title': "It's updated",
      'message': "Your informations have been updated successfully.",
      'back': 'Back to home',
    },
    'report': {
      'title':  'Job Report',
    },
    'log': {
      'close' : 'Close',
    },
    'edit':{
      'title': 'Editing cards list',
      'message': '',
      'submitButton':'Save',
    },
    'delete': {
      'workflow': {
        'title': 'Deleting workflow:',
        'message': 'Do you want to permanently delete the workflow {{resource.name}}?',
        'submitButton': 'Delete',
      },
      'workflows': {
        'title': {
          'zero': 'No workflow was selected',
          'one': 'Deleting workflow',
          'other': 'Deleting workflows'
        },
        'message': {
          'zero': 'You need to select workflow before deleting it.',
          'one': 'Do you want to permanently delete the selected workflow?',
          'other': 'Do you want to permanently delete all the {{count}} selected workflows?',
        },
        'submitButton': {
          'zero': 'Ok',
          'one':'Delete',
          'other': 'Delete All',
        },
      },
      'datasource': {
        'title': 'Deleting datasource:',
        'message': 'Do you want to permanently delete the datasource {{resource.name}}?',
        'submitButton': 'Delete',
      },
      'dashboard': {
        'title': 'Deleting dashboard:',
        'message': 'Do you want to permanently delete the dashboard {{resource.name}}?',
        'submitButton': 'Delete',
      }
    },
    'leave': {
      'workflow': {
        'title': 'Leave workflow drawer',
        'message': 'Any unsaved changes will be lost. Do you want to leave?',
        'submitButton': 'Yes, leave',
        'cancelButton': 'Stay',
      }
    },
    'code': {
      'title': 'Source Code generated by Job {{jobId}}',
      'cancelButton': 'Close'
    },
    'default': {
      'title': 'Warning',
      'message': 'Are you sure of this?',
      'cancelButton': 'Cancel',
      'submitButton': 'Ok',
    },
  },
  'job': {
    'self': 'Job',
    'show': {
      'code': 'Code',
      'report': 'Report',
      'log': 'Log',
      'stop': 'Stop',
      'workflow': 'Workflow',
      'logger': {
        'error': "An error occured, click to see details",
        'success': "Task completed, click to see details",
        'title': "Job's Log",
        'information': "Completed. Double click any task to see details."
      },
    },
    'results': {
      'title': 'The {{resource}} result of this job',
      'backBtn': 'Back to results',
      'visualization': 'Visualization',
    }
  },
  'jobs': {
    'self': 'Jobs',
    'description': 'List of all jobs - e.g. waiting, running, completed, etc..',
    'searchFor': 'Search',
    'taskModal': {
      'results': 'Results',
      'images': 'Images',
      'logs': 'Logs',
      'tables': 'Tables',
      'params': 'Parameters',
    },
    'delete-modal': {
      'title': {
        'one':  'Deleting "{{job.name}}"',
        'other': 'Deleting {{count}} jobs',
      },
      'message': {
        'one': 'Do you want to delete permanently the job: "{{job.name}}" ?',
        'other':'Do you want to delete permanently {{count}} jobs ?',
      },
      'delete-btn': 'Delete',
      'cancel': 'Cancel'
    },
  },
  'datasource': {
    'self': 'Datasource',
    'edit': {
      'title': 'Editing datasource:',
      'addAttrButton': 'New Attribute',
    },
    'new': {
      'title': 'Upload your database',
      'description': 'Send files in json, csv, xml, netCDF4, HDF5, Shapefile, text, pickle ou a custom format.',
    },
  },
  'visualizations': {
    'evaluate-model': {
      'self': 'evaluate model'
    },
    'table-visualization': {
      'self': 'table visualization'
    },
    'bar-chart': {
      'self': 'bar chart'
    },
    'pie-chart': {
      'self': 'pie chart'
    },
    'line-chart': {
      'self': 'line chart'
    },
    'area-chart': {
      'self': 'area chart'
    },
    'summary-statistics': {
      'self': 'summary statistics'
    },
  },
  'share': {
    'title': 'Share',
    'emptyPermissions': 'Share with others users',
    'sharedUsers': 'Shared with those users',
    'allUsers': 'All users',
  },
  'dashboards': {
    'self': 'Dashboards',
    'title': 'Dashboards',
    'description': 'List of all Dashboards - e.g. private, public, etc..',
    'searchFor': 'Search',
  },
  'landing-page': {
    'self': 'Landing Page'
  },
  'home': {
    'self': 'Home'
  },
  'password': {
    'reset': {
      'submit': 'Request',
      'success': 'An email has been sent to you!',
      'error': 'This email'
    },
    'edit': {
      'header': 'Choose your new password',
      'submit': 'Change password',
      'success': 'Password changed with success',
    }
  },
  'newLine': '[new_line]',
  'en': 'English',
  'pt': 'Português',
  'error': 'Error',
  'interrupted': 'Interrupted',
  'pending': 'Pending',
  'running': 'Running',
  'status': 'Status',
  'waiting': 'Waiting',
  'canceled': 'Canceled',
  'completed': 'Completed',
  'profile': 'Profile',
  'logout': 'Logout',
  'workflows': {
    'self':'workflows',
    'singular': 'Workflow',
    'title': 'Workflows',
    'description': 'List of all workflows - e.g. owned, shared, etc..',
    'searchFor': 'Search',
    'edit': {
      'title': 'Editing workflow:',
    },
    'create-new-modal': {
      'title': 'Creating new workflow',
      'name': 'My workflow',
      'description': 'This is my workflow...',
      'create': 'Create',
      'cancel': 'Cancel',
    },
    'edit-modal': {
      'title': 'Editing workflow',
      'name': 'My workflow',
      'description': 'This is my workflow...',
      'save': 'Save',
      'cancel': 'Cancel',
    },
    'draw': {
      'executeBtn': 'Execute',
      'drawMode': 'Draw mode',
      'drawModeTooltip': 'In draw mode the main sidebar gets disabled, so you might have a better experience drawing your workflow.',
    },
    'alert-modal': {
      'saveSuccess': {
        'title': 'Save',
        'message': 'The workflow was successfully saved.'
      },
      'saveFailed': {
        'title': 'Save',
        'message': 'An error occured, the workflow was not save.'
      },
      'deleteSuccess': {
        'title': 'Delete',
        'message': 'The workflow was successfully deleted. You will be redirect.'
      },
      'deleteFailed': {
        'title': 'Delete',
        'message': 'An error occured, the workflow was not deleted.'
      },
      'executionFailed': {
        'title':'Execution failed',
        'message':'The execution failed, please check the settings of your workflow and try again.'
      }
    },
    'delete-modal': {
      'title': {
        'one':  'Deleting "{{workflow.name}}"',
        'other': 'Deleting {{count}} workflows',
      },
      'message': {
        'one': 'Do you want to delete permanently the workflow: "{{workflow.name}}" ?',
        'other':'Do you want to delete permanently {{count}} workflows ?',
      },
      'delete-btn': 'Delete',
      'cancel': 'Cancel'
    },
    'unsaved-changes-modal': {
      'title': 'Unsaved Changes',
      'message': "The current workflow has unsaved changes. If you leave the changes won't be save.",
      'save': 'Save and leave',
      'leave': 'Leave',
      'cancel': 'Cancel',
    },
    'pre-execution-modal': {
      'title': 'Start Job',
      'message': 'Setup your job before running.',
      'name': {
        'label': 'Name',
      },
      'cluster': {
        'label': 'Cluster',
      },
      'runBtn': 'Run',
      'cancel': 'Cancel',
    }
  },
  'datasources': {
    'self': 'Datasources',
    'title': 'Datasources',
    'description': 'List of all datasources - e.g. owned, shared, etc..',
    'searchFor': 'Search',
    'edit': {
      'title': 'Edit parameters of <strong>{{datasourceName}}</strong>',
      'save-button': 'Save',
      'transition-button': 'Back to {{route}}',
      'helpers': {
        'precision': 'Precision',
        'treat_as_missing': 'Treat as Missing',
        'nullable': 'Allow null',
      },
    },
    'alert-modal': {
      'inferSuccess': {
        'title': 'Infer schema has succeed',
        'message': 'Please review the infered attributes and feel free to edit them.'
      },
      'inferFailed': {
        'title': 'Infer schema Failed',
        'message': 'An error occured when we tried to infer schema, the server responded with the message:'
      },
      'saveSuccess': {
        'title': 'Save',
        'message': 'The datasource was successfully saved.'
      },
      'saveFailed': {
        'title': 'Save',
        'message': 'An error occured, the datasource was not save.'
      },
    },
    'upload-modal': {
      'title': 'Upload Datasource',
      'uploading-header': 'Uploading file: <strong>{{fileName}}</strong>',
      'dropzone-message': 'Drag and drop your file here or',
      'browse-button':'Choose your file',
      'success-message': 'The  <strong>{{fileName}}</strong> has been successfully uploaded.',
      'error-message': 'A error occuried on upload of  <strong>{{fileName}}</strong>. The server respond with:',
      'upload-more': 'New Upload',
      'cancel': 'Cancel'
    },
    'delete-modal': {
      'title': {
        'one':  'Deleting "{{datasource.name}}"',
        'other': 'Deleting {{count}} datasources',
      },
      'message': {
        'one': 'Do you want to delete permanently the datasource: <strong>{{datasource.name}}</strong>?',
        'other':'Do you want to delete permanently <strong>{{count}}</strong> datasources ?',
      },
      'delete-btn': 'Delete',
      'cancel': 'Cancel'
    },
  },
  'form-expression': {
    'buttons': {
      'save': 'Save',
      'cancel': 'Cancel',
      'open-editor': 'Open Editor',
    },
    'modal': {
      'table': {
        'expression': 'Expression',
        'alias': 'Alias',
      },
      'buttons': {
        'add': 'Add new expression'
      },
    }
  },
};
