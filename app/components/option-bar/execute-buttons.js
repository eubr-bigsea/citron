import Ember from 'ember';
import config from '../../config/environment';

const { $:{ajax} } = Ember;

export default Ember.Component.extend({
  classNames: ['execute-bar'],
  actions: {
    play(){
      let workflow = this.get('workflow');
      ajax({
        url:`${config.ai_social_rails}/jobs`,
        type: 'POST',
        data: { job: JSON.stringify(workflow) }
      });
    },
    pause(){},
    stop(){},
  },
});
