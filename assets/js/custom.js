$(document).ready(function(){
  var url = 'http://localhost:8000/';
  var page = 1;

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
      url: url + 'api/User/read.php',
      data: {page:page}
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
      rows = rows + '<a href="#edit-user" class="btn-floating yellow darken-2 modal-trigger"><i class="material-icons">edit</i></a>';
      rows = rows + '<a href="#remove-user" class="btn-floating red darken-2 modal-trigger"><i class="material-icons">delete</i></a>';
      rows = rows + '</td>';
      rows = rows + '</tr>';
    });

    $('tbody').html(rows);
  }

});
