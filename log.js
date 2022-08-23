function currentDate(){
    const date = new Date();
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear();
    if(day.length == 1){
      day = `0${day}`;
    }
    if(month.length == 1){
      month = `0${month}`;
    }
    return `${year}-${month}-${day}`;
  }

  function currentTime(){
    var today = new Date();
    var hour = today.getHours().toString();
    var minute = today.getMinutes().toString();
    if (hour.length == 1){
      hour = '0'+hour;
    }
    if (minute.length == 1){
      minute = '0'+minute;
    }    
    return `${hour}:${minute}`;
  }

  function drawHome(){
    $('#log').DataTable().ajax.reload();
    $('#new_button').show();
    $('#newform').hide();
  }

  function showNewLog(){
    trans_type = 'new';
    $('#date').val(currentDate());
    $('#time').val(currentTime());
    $('#type').val('');
    $('#description').val('');
    var w = $('#new_button').width();
    $('#new_button').hide();
    $('#newform').show();
    $('#delete_button').hide();
    $('#save_button').width(w);
    $('#cancel_button').width(w);
  }

  function delLog(){
    var x = confirm('Are you sure you want to delete this record?');
    if (x){
      $.post('calls.php', {trans: 'delete', id: active}).then(function(){
       drawHome();
      });
    }
  }

  function showEditLog(date, time, type, description){
    trans_type = 'edit';
    $('#date').val(date);
    $('#time').val(time);
    $('#type').val(type);
    $('#description').val(description);
    var w = $('#new_button').width();
    $('#new_button').hide();
    $('#newform').show();
    $('#delete_button').show();
    $('#save_button').width(w);
    $('#cancel_button').width(w);
    $('#delete_button').width(w);
    
  }

  function newLog(){
    if ([$('#date').val(), $('#time').val(), $('#type').val(), $('#description').val()].includes('')){
      alert('All Fields Must Be Filled Out!');
      return;
    }
    var dt = $('#date').val()+' '+$('#time').val();;
    $.post('calls.php', { trans : trans_type, date : $('#date').val(), time : $('#time').val(), type : $('#type').val(), description : $('#description').val(), id : active }).then(function(){      
      drawHome();
    });    
  }
  
  var active = 0;
  var trans_type = '';

  $( document ).ready(function() {
      var table = $('#log').DataTable({
        ajax : {
          url: 'calls.php?type=all',
          datasrc: 'data'
        },
        columns: [
            { title: 'DateTime', data: 'dt', "targets": [ 0 ] },
            { title: 'Type', data: 'foodtype',"targets": [ 1 ] },
            { title: 'Description', data: 'food_desc', "targets": [ 2 ] },
            { title: 'sort', date: 'sort', visible: false, "targets": [ 3 ]},
            { title: 'id', date: 'id', visible: false, "targets": [ 4 ]},
            { title: 'date', date: 'date', visible: false, "targets": [ 5 ]},
            { title: 'time', date: 'time', visible: false, "targets": [ 6]},
            { title: 'foodtype_id', date: 'foodtype_id', visible: false, "targets": [ 7]}            
        ],
        columnDefs: [{
          "defaultContent": "g",
          "targets": "_all"
        }],
        order: [[ 3, 'desc' ]],
        "ordering": false,
      });


      $('#log tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        active = data.id;
        showEditLog(data.date, data.time, data.foodtype_id, data.food_desc);
      });      
    });