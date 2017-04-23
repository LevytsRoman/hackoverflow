$(document).ready(function () {

  $('.view_comments').on('click', function(event) {
    event.preventDefault();
    $(event.target).prev().show();
    $(event.target).hide();
    $(event.target).parent().parent().parent().children().last().show();
  });

  $('.hide_comments').on('click', function(event) {
    event.preventDefault();
    $(event.target).next().show();
    $(event.target).hide();
    $(event.target).parent().parent().parent().children().last().hide();
  });

  $('.add_comments').on('click', function(event) {
    event.preventDefault();
    $(event.target).hide();
    $(event.target).next().next().next().next().show()
  });

  $('.cancel').on('click', function(event) {
    event.preventDefault();
    $(event.target).parent().hide();
    $(event.target).parent().prev().prev().prev().prev().show();
  });

  $('.edit').on('click', function(event) {
    event.preventDefault();
    $(event.target).closest('.user-tools').hide();
    $(event.target).closest('.user-tools').prev().hide();
    $(event.target).parent().parent().prev().prev().children().last().children().first().hide();
    $(event.target).closest('.user-tools').next().show();
  });

  $('.update').submit( function (event) {
    event.preventDefault();
    var $inputs = $('form :input');
    var values = {};
    $inputs.each(function() {
      values[this.name] = $(this).val();
    });
    var route = $(this).attr('action');
    $.ajax({
      url: route,
      method: "put",
      data: values
    }).done(function(msg) {
      // I don't get an error message but lines 51-53 dont do anything. I'm trying to display the edited comment.
      $(event.target).parent().prev().show();
      $(event.target).parent().prev().prev().show();
      $(event.target).parent().prev().prev().prev().children().last().children().first().text(msg.text).show();
    });
  });

  $(".create_comment").submit(function(event) {
    event.preventDefault();
    var route = $(this).attr('action');
    $.ajax({
      url: route,
      type: "POST",
      data: $(this).serialize()
    }).done(function(response) {
      $(event.target).parent().next().show()
      $(event.target).parent().hide();
      $(event.target).parent().prev().prev().prev().prev().show()


      $(event.target).parent().next().append("<div class='answer-vote'><p id='answer.id>' class='answer-body grey lighten-4'>" + response.comment + "</p></div><div class='answer-comment left-align'><div class='answer-date'><a class='answer-user' href='/users/answer.user.id'>" + response.user + "</a>" + response.date + "</div></div>")


    });
  });

});
