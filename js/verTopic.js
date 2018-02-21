let userTopic = $('.user-topic');
let message = $('.content-topic');
let userMessage = $('#user-message');
let messagePost = $('#message-post');
let btnCreateMessage = $('#btn-create-message');
let contMessage = $('.container-message');

let id = localStorage.id;

function getInfo() {
  let url = `https://examen-laboratoria-sprint-5.herokuapp.com/topics/${id}`;
  $.ajax({
    url: url
  }).done(showInfo);
}

function getMessage() {
  let url = `https://examen-laboratoria-sprint-5.herokuapp.com/topics/${id}/responses`;
  $.ajax({
    url: url
  }).done(showMessage);
}


function showInfo(data) {
  userTopic.text(data.author_name);
  message.text(data.content);
}

function showMessage(data) {
  data.forEach(function(element) {
    let author = element.author_name;
    let content = element.content;
 
    templateMessage(author, content);
  });
}

function templateMessage(author, content) {
  template = `<div class="card mt-3">
    <div class="card-header">
     <h5>${author}</h5>
    </div>
    <div class="card-body">
      <h5 class="card-title">Tema:</h5>
      <p class="card-text">${content}</p>
    
    </div>
  </div>`;
  contMessage.prepend(template);
}


function createMessage() {
  let user = userMessage.val();
  let content = messagePost.val();
  let data = {
    'author_name': user,
    'content': content,
    'topic_id': id
  };

  let url = `https://examen-laboratoria-sprint-5.herokuapp.com/topics/${id}/responses`;

  $.ajax({
    type: 'POST',
    url: url,
    data: data,
    success: function() {
      templateMessage(user, content);
    },

  });
}


btnCreateMessage.on('click', createMessage);

getInfo();
getMessage();