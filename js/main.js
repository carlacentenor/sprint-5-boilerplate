
const search = $('#search');
const container = $('#container');
const userTopic = $('#user');
const messageTopic = $('#message');
const btnCreateTopic = $('#btn-create-topic');


function template(author, content, id, responses) {
  template1 = `<div class=col-12><div class=" card mt-3 title" data-id=${id} >
    <div class="card-header">
    <div class="d-inline-block mr-3"><img src="assets/images/usuario.png" ></div><div class="d-inline-block"><h5>${author}</h5></div>
     
    </div>
    <div class="card-body">
      <h5 class="card-title">Tema:</h5>
      <a href="views/verTopic.html" class="card-text respons-topic content-post-topic" data-id=${id}>${content}</a>
      <div>
      <p   class="">Respuestas : ${responses}</p>
      </div>
    </div>
  </div>
  </div>`;
  container.prepend(template1);
}


function handleResponse(data) {
  data.forEach(function(element) {
    let author = element.author_name;
    let content = element.content;
    let id = element.id;
    let responses = element.responses_count;
    template(author, content, id, responses);
  });
}


$.ajax({
  url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics',
  success: function() {
    search.on('keyup', function() {
      var value = $(this).val().toLowerCase();
      $('#container .col-12').filter(function() {
        $(this).toggle($(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1);
        console.log($(this).text());
      });
    });
  }
}).done(handleResponse);

function createTheme() {
  let user = userTopic.val();
  let content = messageTopic.val();
  let data = {
    'author_name': user,
    'content': content
  };

  let url = 'http://examen-laboratoria-sprint-5.herokuapp.com/topics';

  $.ajax({
    type: 'POST',
    url: url,
    data: data,
    success: function() {
      template(user, content, 0, 0);
    },

  });
}


$(document).on('click', '.respons-topic', function() {
  let value = $(this).data('id');
  localStorage.id = value;
});


// filtrar


btnCreateTopic.on('click', createTheme);
