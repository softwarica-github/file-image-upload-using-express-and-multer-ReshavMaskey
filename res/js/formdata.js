$(document).ready(function() {
  $("#uploadDetail").submit(function(e) {
    e.preventDefault();

    var data = {
      name: $("#name").val(),
      email: $("#email").val(),
      address: $("#address").val(),
      feedback: $("#comment").val(),
      userphoto: $("#uploadedFile")[0].files[0]
    };

    var formdata = new FormData();
    formdata.append("name", $("#username").val());
    formdata.append("email", $("#password").val());
    formdata.append("address", $("#address").val());
    formdata.append("comment", $("#comment").val());
    formdata.append("upload", $("#uploadedFile")[0].files[0]);

    console.log("reshav", data);
    for (key in data) {
      console.log(key);
    }

    $.ajax({
      url: "http://localhost:3000/upload",
      method: "POST",
      contentType: false,
      processData: false,
      dataType: "json",
      data: formdata,
      statusCode: {
        200: function() {
          console.log("in 200");
        }
      },
      success: function(result, status, jqXHR) {
        console.log(result);
        console.log("Success");
      },
      error: function(ress) {
        console.log("Error");
        console.log(ress);
        console.log(ress.responseText);
      }
    });
  });
});
