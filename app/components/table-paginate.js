import { computed } from '@ember/object';
import { alias, gt } from '@ember/object/computed';
import Component from '@ember/component';
import Util from 'ember-cli-pagination/util';
import PageItems from 'ember-cli-pagination/lib/page-items';
import Validate from 'ember-cli-pagination/validate';

export default Component.extend({
  classNames: ['table-paginate'],

  currentPage: alias("content.page"),
  totalPages: alias("content.totalPages"),

  hasPages: gt('totalPages', 1),

  truncatePages: true,
  numPagesToShow: 10,

  validate: function() {
    if (Util.isBlank(this.get('currentPage'))) {
      Validate.internalError("no currentPage for page-numbers");
    }
    if (Util.isBlank(this.get('totalPages'))) {
      Validate.internalError('no totalPages for page-numbers');
    }
  },

  pageItemsObj: computed(function() {
    return PageItems.create({
      parent: this,
      currentPage: alias("parent.currentPage"),
      totalPages: alias("parent.totalPages"),
      truncatePages: alias("parent.truncatePages"),
      numPagesToShow: alias("parent.numPagesToShow"),
      showFL: alias("parent.showFL")
    });
  }),

  pageItems: computed("pageItemsObj.pageItems","pageItemsObj", function() {
    this.validate();
    return this.get("pageItemsObj.pageItems");
  }),

  canStepForward: computed("currentPage", "totalPages", function() {
    const page = Number(this.get("currentPage"));
    const totalPages = Number(this.get("totalPages"));
    return page < totalPages;
  }),

  canStepBackward: computed("currentPage", function() {
    const page = Number(this.get("currentPage"));
    return page > 1;
  }),

  actions: {
    pageClicked: function(number) {
      Util.log("PageNumbers#pageClicked number " + number);
      this.set("currentPage", number);
    },
    incrementPage: function(num) {
      const currentPage = Number(this.get("currentPage")),
        totalPages = Number(this.get("totalPages"));

      if(currentPage === totalPages && num === 1) { return false; }
      if(currentPage <= 1 && num === -1) { return false; }
      this.incrementProperty('currentPage', num);
    }
  }
});
