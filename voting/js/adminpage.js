$("document").ready(function () {

    $.get(
        `http://localhost:3000/Candidates`,
        function(data) {
          for (i in data) {
            $("#table").append(
              "<tr>" +
                "<td>" +
                data[i].firstname +
                "</td>" +
                "<td>" +
                data[i].middlename +
                "</td>" +
                "<td>" +
                data[i].lastname +
                "</td>" +
                "<td>" +
                data[i].dateOfBirth +
                "</td>" +
                "<td>" +
                data[i].party +
                "</td>" +
                "<td>" +
                data[i].State +
                "</td>" +
                "<td>" +
                "<button>" +
                "Update" +
                "</button>" +
                "</td>" +
                "<tr>"
            );
          }
        },
        "json"
      );


})