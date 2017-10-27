/* eslint-env node */
module.exports = {
  'test_page': 'tests/index.html?hidepassed',
  'disable_watching': true,
  'timeout': 540,
  'parallel': 5,
  'browser_start_timeout': 90,
  'launch_in_ci': [
    'SLChrome',
    'SLFirefox',
    'SLSafari',
  ],

  launchers: {
    SLChrome: {
      'exe': 'ember',
      'args': [
        'sauce:launch',
        '-b',
        'Chrome',
        '-v',
        '60',
        '--visibility',
        'public',
        '-p',
        'Windows 10',
        '--attach',
        '--no-connect',
        '--url'
      ],
      'protocol': 'browser'
    },

    SLFirefox: {
      'exe': 'ember',
      'args': [
        'sauce:launch',
        '-b',
        'Firefox',
        '-v',
        '54',
        '--visibility',
        'public',
        '-p',
        'Windows 10',
        '--attach',
        '--no-connect',
        '--url'
      ],
      'protocol': 'browser'
    },

    SLSafari: {
      'exe': 'ember',
      'args': [
        'sauce:launch',
        '-b',
        'safari',
        '-v',
        '10',
        '--visibility',
        'public',
        '-p',
        'macOS 10.12',
        '--no-connect',
        '--url'
      ],
      'protocol': 'tap'
    }
  }
};
