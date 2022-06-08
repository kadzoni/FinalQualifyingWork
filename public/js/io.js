$(function(){
    var socket = io.connect();
    var $form = $("#FormMassage");
    var $name = $("#name");
    var $textarea = $("#SendMassage");
    var $all_massages = $("#AllMassages");

    $form.submit(function(event){
      event.preventDefault();
      socket.emit('send mess', {mess: $textarea.val(), name: $name.val()});
      $textarea.val('');
    });

    socket.on('add mess', function(data){
      $all_massages.append("<div><b>"+data.name+"</b>:"+ data.mess +"</div>");
    });
});