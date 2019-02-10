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
      rows = rows + '<a href="#edit-user" class="btn-floating btn-small yellow darken-2 modal-trigger edit-user"><i class="material-icons">edit</i></a>';
      rows = rows + '<a href="#delete-user" class="btn-floating btn-small red darken-2 modal-trigger delete-user"><i class="material-icons">delete</i></a>';
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
    var first_name = create_modal.find("input[name='first_name']").val().trim();
    var last_name = create_modal.find("input[name='last_name']").val().trim();
    var phone_number = create_modal.find("input[name='phone_number']").val().trim();
    var email = create_modal.find("input[name='email']").val().trim();

    if(first_name != '' && last_name != '' && phone_number != '' && email != ''){
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

          // Close modal
          $('.modal').modal('close');

          getData();

          M.toast({html: 'User created successfully!', classes: 'green'});
        }else{
           M.toast({html: data});
        }
      });
    }else{
      M.toast({html: 'Fields are required!', classes: 'red'});
    }
  });

  /**
  * Delete user function.
  **/
  $('body').on('click', '#delete-submit', function(){
    var id = $('.delete-user').parent("td").data('id');
    var c_obj = $('.delete-user').parents("tr");

    $.ajax({
      dataType: 'json',
      type:'POST',
      url: url + 'api/User/delete.php',
      data:{id:id}
    }).done(function(data){
      if(data.status == 'success'){
        $('.modal').modal('close');
        c_obj.remove();
        getData();
        M.toast({html: 'User: ' + data.id + ' has been removed', classes: 'green'});
      }else{
        M.toast({html: data.status, classes: 'red'});
      }
    });
  });

  /**
  * Display table data on inputs function.
  **/
  $('body').on('click', '.edit-user', function(){
    var id = $(this).parent("td").data('id');
    var first_name = $(this).parent("td").prev("td").prev("td").prev("td").prev("td").text();
    var last_name = $(this).parent("td").prev("td").prev("td").prev("td").text();
    var phone_number = $(this).parent("td").prev("td").prev("td").text();
    var email = $(this).parent("td").prev("td").text();

    $("#edit-user").find("input[name='first_name']").val(first_name);
    $("#edit-user").find("input[name='last_name']").val(last_name);
    $("#edit-user").find("input[name='phone_number']").val(phone_number);
    $("#edit-user").find("input[name='email']").val(email);
    $("#edit-user").find(".edit-id").val(id);
  });

  /**
  * Update user function.
  **/
  $('#edit-submit').click(function(e){
    e.preventDefault();

    var edit_modal = $("#edit-user");

    var form_action = edit_modal.find("form").attr("action");
    var form_method = edit_modal.find("form").attr("method");

    var first_name = edit_modal.find("input[name='first_name']").val().trim();
    var last_name = edit_modal.find("input[name='last_name']").val().trim();
    var phone_number = edit_modal.find("input[name='phone_number']").val().trim();
    var email = edit_modal.find("input[name='email']").val().trim();
    var id = edit_modal.find(".edit-id").val().trim();

    if(first_name != '' && last_name != '' && phone_number != '' && email != ''){
      $.ajax({
        type: form_method,
        url: url + form_action,
        data: {first_name:first_name, last_name:last_name, phone_number:phone_number, email:email, id:id}
      }).done(function(data){
        if(data == 'success'){
          $('.modal').modal('close');
          getData();
          M.toast({html: 'User has been updated!', classes: 'green'});
        }else{
          M.toast({html: data, classes: 'red'});
        }
      });
    }else{
      M.toast({html: 'Fields are required!', classes: 'red'});
    }
  });

  /**
  * Search user function.
  **/
  $('#search').keyup(function(){
    var text = $(this).val().trim();
    var form_action = $('#search-field').find('form').attr('action');
    var form_method = $('#search-field').find('form').attr('method');

    // Filter users
    if(text != ''){

      $.ajax({
        dataType: 'json',
        url: url + form_action,
        method: form_method,
        data: {search:text}
      }).done(function(data){
        if(data.status == 'success'){
          manageRow(data.data);
        }
      });

    }else{
      // If search input is empty return all data
      getData();
    }

  });

});
