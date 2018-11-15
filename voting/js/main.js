//  $(document).ready(function(){

//   function User(firstname, middlename, lastname, dateOfBirth, username, password){
//       this.id = 1;
//       this.firstname = firstname;
//       this.middlename = middlename;
//       this.lastname = lastname;
//       this.dateOfBirth = dateOfBirth;
//       this.username = username;
//       this.password = password;
//   }



$("#register").click(function(){
  var firstname = $("#fname").val();
  var middlename = $("#mname").val();
  var lastname = $("#lname").val();
  var dateOfBirth = $("#dateofbirth").val();
  var username = $("#uname").val();
  var password = $("#pword").val();

   alert(firstname);
  // alert(middlename);
  // alert(lastname);
  // alert(dateOfBirth);
  // alert(username);
  // alert(password);

  var url = 'http://localhost:3000/users';

  $.post(url, 
    {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      dateOfBirth: dateOfBirth,
      username: username,
      password: password
    },

      function(data, status) {
        alert("Data:" + data + "\nStatus:" + status);
        
    });

 });
