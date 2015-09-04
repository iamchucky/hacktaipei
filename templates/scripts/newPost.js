$('#post-submit').click(function(e) {
  var invalidReason = '';

  var title = $('#post-title').val().trim();
  var content = $('#post-content').val().trim();
  var location = $('#post-location').val().trim();
  invalidReason = checkPost(title, content, location);

  if (invalidReason) {
    e.preventDefault();
    $('#err-text').text(invalidReason);
  }
});

function checkPost(title, content, location) {
  if (!title) return '請輸入標題';
  if (!content) return '請輸入內容';
}
