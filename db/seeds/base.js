
exports.seed = function(knex, Promise) {
  return knex('users').insert({
      id: '10153171150675679',
      name: '楊宗霖',
      created_at: new Date()
    })
    .then(function() {
      return knex('posts').insert([{
        id: 1,
        user_id: '10153171150675679',
        title: '問題一',
        content: '有沒有第一次XX就上手的八卦？',
        location: '台北市',
        lat: '25.08',
        lng: '121.55',
        created_at: new Date(),
        updated_at: new Date()
      }]);
    })
    .then(function() {
      return knex.raw("select setval('\"posts_id_seq\"',?);", [1]);
    })
    .then(function() {
      return knex('scores').insert([{
        id: 1,
        users: {},
        score: 0,
        post_id: 1
      }]);
    })
    .then(function() {
      return knex.raw("select setval('\"scores_id_seq\"',?);", [1]);
    });
};
