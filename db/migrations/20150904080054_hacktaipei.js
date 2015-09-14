
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t) {

    t.string('id').primary();
    t.string('name').notNull();

    t.dateTime('created_at').notNull();

  }).createTable('posts', function(t) {

    t.increments().primary();

    t.string('user_id').references('users.id').notNull();

    t.string('title').notNull();
    t.text('content').notNull();
    t.string('location').nullable();
    t.string('lat').nullable();
    t.string('lng').nullable();

    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').notNull();

  }).createTable('answers', function(t) {

    t.increments().primary();

    t.integer('post_id').references('posts.id').notNull();

    t.string('user_id').references('users.id').notNull();
    t.text('content').notNull();

    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').notNull();

  }).createTable('comments', function(t) {

    t.increments().primary();

    t.integer('post_id').references('posts.id').nullable();
    t.integer('answer_id').references('answers.id').nullable();

    t.string('user_id').references('users.id').notNull();
    t.text('content').notNull();
    t.integer('score').notNull();

    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').notNull();

  }).createTable('scores', function(t) {

    t.increments().primary();

    t.json('users').notNull();
    t.integer('score').notNull();

    t.integer('post_id').references('posts.id').nullable();
    t.integer('answer_id').references('answers.id').nullable();

  }).createTable('tags', function(t) {
    
    t.increments().primary();

    t.integer('post_id').references('posts.id').nullable();
    t.string('tag').notNull();

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags')
    .dropTable('scores')
    .dropTable('comments')
    .dropTable('answers')
    .dropTable('posts')
    .dropTable('users');
};
