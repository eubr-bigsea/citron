import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  types: [
    'FLOAT',
    'LAT_LONG',
    'TIME',
    'DOUBLE',
    'DECIMAL',
    'ENUM',
    'CHARACTER',
    'LONG',
    'DATETIME',
    'VECTOR',
    'TEXT',
    'DATE',
    'INTEGER',
    'TIMESTAMP'
  ],
  isNotChar: false,
  isNotNum: false,

  init(){
    this._super(...arguments);
    this.addObserver('attr.type', this, 'typeDidChange');
    this.typeDidChange();
  },

  typeDidChange(){
    let type = this.get('attr.type');
    var isNum = ['INTEGER', 'FLOAT', 'DOUBLE', 'DECIMAL', 'LONG'];
    var isChar = ['CHARACTER', 'TEXT']
    if(isNum.includes(type)){
      this.set('isNotNum', false);
      this.set('isNotChar', true);
    } else if (isChar.includes(type)){
      this.set('isNotNum', true);
      this.set('isNotChar', false);
    }
  },

  actions: {
    removeAttr(){
      this.get('removeAttr')(this.get('attr'));
    },
  },
});
