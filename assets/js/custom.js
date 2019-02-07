$(document).ready(function(){
  var url = 'http://localhost:8000/';

  // Call getData Function to display data
  getData();

  /**
  * Call to Predefined materialize function for modal.
  **/
  $('.modal').modal();

  /**
  * Display data function.
  **/
  function getData(){
    $.ajax({
      dataType: 'json',
      url: url + 'api/User/read.php'
    }).done(function(data){
      if(data.status = 'success'){
        manageRow(data.data);
      }
    });
  }

  /**
  * Manage row function.
  **/
  function manageRow(data){
    var rows = '';
    $.each(data, function(key, value){
      rows = rows + '<tr>';
      rows = rows + '<td>'+value.first_name+'</td>';
      rows = rows + '<td>'+value.last_name+'</td>';
      rows = rows + '<td>'+value.phone_number+'</td>';
      rows = rows + '<td>'+value.email+'</td>';
      rows = rows + '<td data-id="'+value.user_id+'">';
      rows = rows + '<a href="#edit-user" class="btn-floating btn-small yellow darken-2 modal-trigger"><i class="material-icons">edit</i></a>';
      rows = rows + '<a id="remove-submit" href="#remove-user" class="btn-floating btn-small red darken-2 modal-trigger"><i class="material-icons">delete</i></a>';
      rows = rows + '</td>';
      rows = rows + '</tr>';
    });

    $('tbody').html(rows);
  }

  /**
  * Create new user.
  **/
  $('#add-submit').click(function(e){
    e.preventDefault();
    var create_modal = $('#add-user');
    var form_action = create_modal.find("form").attr("action");
    var form_method = create_modal.find("form").attr("method");
    var first_name = create_modal.find("input[name='first_name']").val();
    var last_name = create_modal.find("input[name='last_name']").val();
    var phone_number = create_modal.find("input[name='phone_number']").val();
    var email = create_modal.find("input[name='email']").val();

    $.ajax({
      type: form_method,
      url: url + form_action,
      data: {first_name:first_name, last_name:last_name, phone_number:phone_number, email:email}
    }).done(function(data){
      if(data == 'success'){
        create_modal.find("input[name='first_name']").val('');
        create_modal.find("input[name='last_name']").val('');
        create_modal.find("input[name='phone_number']").val('');
        create_modal.find("input[name='email']").val('');
        getData();
         M.toast({html: 'User created successfully!'});

         // Close modal
         $('.modal').modal('close');
      }else{
         M.toast({html: data});
      }
    });
  });

});
