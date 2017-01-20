import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['btn', 'btn-md', 'rounded-s', 'execute-bar', 'execute-btn'],
  tagName: 'a',
  actions: {
    play(){},
    pause(){},
    stop(){},
  },
});
