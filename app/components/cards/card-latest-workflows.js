import Ember from 'ember';

export default Ember.Component.extend({

	sortBy: ['updated_at:desc'],
	sortedModel: Ember.computed.sort('workflows', 'sortBy'),
	willRender(){
		this.set('slicedModel', this.get('sortedModel').slice(0,5));
	},
	actions: {
		changeSorter(sortProp){
			var sortOrder;
			var sortAtual = [sortProp + ":asc"];
			if(this.get('sortBy')[0] === sortAtual[0]){
				sortOrder = 'desc';
			} else {
				sortOrder = 'asc';
			}
			this.set('sortBy',[sortProp + ":" + sortOrder]);
		}
	}
});

