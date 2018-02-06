import { computed } from '@ember/object';
import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
	didInsertElement(){
		// get and return the current range value
		var rangeValue = $('#rangePercentage').val();
		return this.set('currentValue', rangeValue);
	},
    deltaValue: computed('currentValue', function() {
  		return 100 - this.get('currentValue');
  	})		

});
