import Component from '@ember/component';

export default Component.extend({
  didInsertElement(){
    this._super(...arguments);
    let resumable = this.get('resumable');
    if (resumable.support) {
      resumable.assignDrop(this.$('#dropzone'));
      resumable.assignBrowse(this.$('#browseButton'));
    }
    let elementId = this.get('elementId');

    $(`#${elementId}`).on('dragover dragenter', function() {
      $(`#${elementId}`).addClass('is-dragover');
    }).on('dragleave dragend drop', function() {
      $(`#${elementId}`).removeClass('is-dragover');
    })
  }
});
