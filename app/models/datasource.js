import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  attribute_delimiter: attr(),
  attributes: attr(),
  created: attr('dates'),
  description: attr(),
  enabled: attr(),
  encoding: attr(),
  estimated_rows: attr(),
  estimated_size_in_mega_bytes: attr(),
  expiration: attr(),
  format: attr(),
  is_first_line_header: attr(),
  is_public: attr(),
  name: attr(),
  permissions: attr(),
  privacy_aware: attr(),
  provenience: attr(),
  read_only: attr(),
  record_delimiter: attr(),
  statistics_process_counter: attr(),
  storage: attr(),
  storage_id: attr(),
  command: attr(),
  tags: attr(),
  task_id: attr(),
  temporary: attr(),
  text_delimiter: attr(),
  treat_as_missing: attr(),
  url: attr(),
  user_id: attr(),
  user_login: attr(),
  user_name: attr(),
  workflow_id: attr()
});
