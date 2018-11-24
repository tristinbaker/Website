$(document).ready(function() {
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

function commandCopy(id) {
  var div = '#statement' + id;
  var input = document.createElement('input');
  document.body.appendChild(input);
  input.value = $(div).text();
  input.select();
  document.execCommand('copy');
  input.remove();
  launch_toast();
}

function launch_toast() {
  var x = document.getElementById("toast");
  x.className = "show";
  setTimeout(function() { x.className = x.className.replace("show", ""); }, 5000);
}
