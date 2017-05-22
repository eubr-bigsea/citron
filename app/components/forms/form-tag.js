import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  didInsertElement() {
    this.$('select').select2({
      tags: true,
      dropdownParent: this.$()
    });
  }
});
