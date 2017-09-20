import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  types: [
    'CHARACTER',
    'DATE',
    'DATETIME',
    'DECIMAL',
    'DOUBLE',
    'ENUM',
    'FLOAT',
    'INTEGER',
    'LAT_LONG',
    'LONG',
    'TEXT',
    'TIME',
    'TIMESTAMP',
    'VECTOR'
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
      this.set('attr.size', null);
    } else if (isChar.includes(type)){
      this.set('isNotNum', true);
      this.set('isNotChar', false);
      this.set('attr.precision', null);
      this.set('attr.scale', null);
    }
  },

  actions: {
    removeAttr(){
      this.get('removeAttr')(this.get('attr'));
    },
  },
});
