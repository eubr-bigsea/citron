import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  attributes: attr(),
  created: attr('dates'),
  description: attr(),
  enabled: attr(),
  estimated_rows: attr(),
  estimated_size_in_mega_bytes:  attr(),
  expiration: attr(),
  format: attr(),
  name: attr(),
  permissions: attr(),
  privacy_aware: attr(),
  provenience: attr(),
  read_only: attr(),
  statistics_process_counter: attr(),
  storage: attr(),
  tags: attr(),
  task_id: attr(),
  temporary: attr(),
  url: attr(),
  user_id: attr(),
  user_login: attr(),
  user_name: attr(),
  workflow_id: attr(),
});
