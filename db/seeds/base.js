
exports.seed = function(knex, Promise) {
  return knex('users').insert({
      id: 'yangchuck@gmail.com',
      name: '楊宗霖',
      created_at: new Date()
    })
    .then(function() {
      return knex('posts').insert([{
        id: 1,
        user_id: 'yangchuck@gmail.com',
        title: '問題一',
        content: '有沒有第一次XX就上手的八卦？',
        score: 0,
        created_at: new Date()
      }]);
    })
    .then(function() {
      return knex.raw("select setval('\"posts_id_seq\"',?);", [1]);
    });
};
