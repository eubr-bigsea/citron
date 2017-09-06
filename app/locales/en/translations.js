export default {
  'notFound': {
    'servers': 'Our servers are in maintenance.',
    'moreLemonade': 'We are making more Lemonade for you.',
    'message': 'The {{resource}} that you are looking for is not available',
    'goBack': 'Go back to'
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
    'inferSchema': {
      'label': 'Infer Schema',
      'label-append': 'Define options for infer schema of datasource',
      'delimiter': 'Delimiter:',
      'quote-char': 'Enclosure:',
      'header': 'Header?',
      'infer': 'Infer Schema',
    },
    'attributes': {
      'label': 'Attributes',
      'label-append': 'Edit attributes of datasource'
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
    'yourProfile': 'Your profile',
  },
  'tables': {
    'id': 'ID',
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
    'precision': 'Precision',
    'scale': 'Scale',
    'nullable': 'Allow null',
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
      },
    },
    'leave': {
      'workflow': {
        'title': 'Leave workflow drawer',
        'message': 'Any unsaved changes will be lost. Do you want to leave?',
        'submitButton': 'Yes, leave',
        'cancelButton': 'Stay',
      }
    },
    'default': {
      'title': 'Warning',
      'message': 'Are you sure of this?',
      'cancelButton': 'Cancel',
      'submitButton': 'Ok',
    },
  },
  'workflow': {
    'self': 'Workflow',
    'edit': {
      'title': 'Editing workflow:',
    },
    'new': {
      'title': 'Creating new workflow:',
      'name': {
        'placeholder': 'My workflow',
      },
      'description': {
        'placeholder': 'This is my workflow...',
      },
    },
    'draw': {
      'save': 'Save',
      'delete': 'Delete this workflow',
      'play': 'Execute'
    }
  },
  'workflows': {
    'self':'workflows',
    'title': 'Workflows',
    'description': 'List of all workflows - e.g. owned, shared, etc..',
    'newBtn': 'Create new',
    'moreActionsBtn': 'More Actions',
    'deleteBtn': 'Delete All',
    'searchFor': 'Search',
  },
  'job': {
    'self': 'Job',
    'show': {
      'results': 'Results',
      'log': 'Log',
      'stop': 'Stop',
      'workflow': 'Workflow',
      'logger': {
        'title': "Job's Log",
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
  },
  'datasources': {
    'self': 'Datasources',
    'description': 'List of all datasources - e.g. owned, shared, etc..',
    'searchFor': 'Search',
    'upload': {
      'uploadDatabase': 'Upload database',
      'chooseButton': 'Choose your file',
      'dropzone': 'Or drag and drop the file here',
      'uploading': 'Uploading file: <strong>{{resource}}</strong>',
      'successMessage': 'The file <strong>{{resource}}</strong> was successfully uploaded.',
      'errorMessage': 'An error occurried to the upload of file <strong>{{resource}}</strong>. The server message error is: {{message}}',
    }
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
    'description': 'List of all Dashboards - e.g. private, public, etc..',
    'searchFor': 'Search',
  },
  'landing-page': {
    'self': 'Landing Page'
  },
  'home': {
    'self': 'Home'
  },
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
};
