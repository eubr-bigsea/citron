import Ember from 'ember';
import groupBy from 'lemonade-ember/utils/group-by';
import { module, test } from 'qunit';

module('Unit | Utility | Group By');

test('it works', function(assert) {
  let data = new Ember.RSVP.Promise(function(resolve) {
    resolve([
      Ember.Object.create({name: "f1", group: [{type: "parent", name: "g1"}]}),
      Ember.Object.create({name: "f2", group: [{type: "parent", name: "g2"}]}),
      Ember.Object.create({name: "f3", group: [{type: "parent", name: "g1"}]}),
    ]);
  });

  groupBy(data, "group").then((el) => {
    assert.equal(el.g1[0].name, "f1");
    assert.equal(el.g1[1].name, "f3");
    assert.equal(el.g2[0].name, "f2");
  });
});
