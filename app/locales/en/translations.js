export default {
  'notFound': {
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
    'options': 'Options',
    'created': 'Created at'
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
      }
    },
    'save': {
      'workflow': {
        'success': 'The workflow was successful saved.',
        'error': 'There was a error, the workflow was not saved.'
      }
    },
  },
  'modal': {
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
    'default': {
      'title': 'Warning',
      'message': 'Are you sure of this?',
      'cancelButton': 'Cancel',
      'submitButton': 'Ok',
    },
  },
  'workflow': {
    'self': 'workflow',
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
    'self': 'job',
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
      'title': 'Results of job',
      'backBtn': 'Back to results',
      'visualization': 'Visualization',
    }
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
};
