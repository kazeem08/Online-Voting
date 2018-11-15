$("document").ready(function () {

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/votes',
        success: function (data) {
            for (let i of data) {

                $("#table").append(

                    "<tr>" +
                    "<td>" +
                    i.firstname +
                    "</td>" +
                    "<td>" +
                    i.middlename +
                    "</td>" +
                    "<td>" +
                    i.lastname +
                    "</td>" +
                    "<td>" +
                    i.dateOfBirth +
                    "</td>" +
                    "<td>" +
                    i.party +
                    "</td>" +
                    "<td>" +
                    i.state +
                    "</td>" +
                    "<td>" +
                    i.votecount +
                    "</td>" +
                    "<td>" +
                    "<button class='delete' id='" + i.id + "'>" +
                    "Del" +
                    "</button>" +
                    "<td>" +
                    "<td>" +
                    "<button data-toggle='modal' data-target='#exampleModal' class='update' id='" + i.id + "'>" +
                    "Update" +
                    "</button>" +
                    "<td>" +
                    "<tr>"
                );

            };

            $(".delete").click(function () {
                // alert("j");
                let del = this.id;
                //alert(del);
                $.ajax({
                    type: 'DELETE',
                    url: `http://localhost:3000/votes/${del}`,
                    success: function () {
                        window.location.replace('./Adminpage.html');
                        alert("Candidate deleted");

                    }

                });
            });

            $(".update").click(function () {
                //var output = $("#update");
                let upd = this.id;
                $.ajax({
                    type: 'GET',
                    url: `http://localhost:3000/votes/${upd}`,
                    success: function (data) {
                        $("#upfname").val(data.firstname);
                        $("#upmname").val(data.middlename);
                        $("#uplname").val(data.lastname);
                        $("#updob").val(data.dateOfBirth);
                        $("#upparty").val(data.party);
                        $("#upstate").val(data.state);
                        $("#userid").val(data.id);
                        $("#votecounted").val(data.votecount);
                        

                    }
                });
            })
        }

    });

    $("#register").click(function () {

        var firstname = $("#fname").val();
        var middlename = $("#mname").val();
        var lastname = $("#lname").val();
        var dateOfBirth = $("#dateofbirth").val();
        var username = $("#uname").val();
        var password = $("#pword").val();
        var isvoted = false;

        var user = {

            firstname: firstname,
            middlename: middlename,
            lastname: lastname,
            dateOfBirth: dateOfBirth,
            username: username,
            password: password,
            isvoted: isvoted
        };

        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/users',
            success: function (data) {
                var j = 0;
                for (let i of data) {
                    if (i.username == username) {
                        alert('Username exists');
                        j = 1;
                        //window.location.replace('./votingpage.html');
                    }

                }

                if (j == 0) {

                    if (firstname == null || firstname == "", middlename == null || middlename == "",
                        lastname == null || lastname == "", dateOfBirth == null || dateOfBirth == "",
                        username == null || username == "", password == null || password == "") {
                        alert("Please Fill All Required Field");
                        return false;
                    }

                    else {

                        $.ajax({
                            type: 'POST',
                            url: 'http://localhost:3000/users',
                            data: user,
                            success: function () {
                                alert('welcome');
                                window.location.replace('./Login.html');
                            },
                        });

                    }

                }


            }

        })

    });


    $("#login").click(function () {

        var userlogin = $("#user").val();
        var userpass = $("#pass").val();

        
        if (userlogin == null || userlogin == "", userpass == null || userpass == "") {
            alert("Enter your username/password");
            return false;
        }

        else {

            $.ajax({
                type: 'GET',
                url: 'http://localhost:3000/users',
                success: function (data) {
                    var j = 1;
                    for (let i of data) {
                        if (i.username == userlogin && i.password == userpass) {
                            alert('welcome');
                            j = 0;

                            var user = i.username;
                            var userid = i.id;
                            var isvoted = i.isvoted;
                            var fname = i.firstname;
                            var mname = i.middlename;
                            var lname = i.lastname;
                            var dob = i.dateOfBirth;
                            var pass = i.password;
                            // $.cookie("username", i.username);
                            // $.cookie("id", i.id);
                            localStorage.setItem("firstname", fname);
                            localStorage.setItem("middlename", mname);
                            localStorage.setItem("lastname", lname);
                            localStorage.setItem("dateOfBirth", dob);
                            localStorage.setItem("username", user);
                            localStorage.setItem("id", userid);
                            localStorage.setItem("isvoted", isvoted);
                            localStorage.setItem("password", pass);


                            
                            console.log(localStorage);

                            window.location.replace('./votingpage.html');
                        }
                    }

                    if (j == 1) {
                        alert('username/password incorrect');

                    }

                },
            });

        }

    });

    $("#vote").click(function () {

        // let vtr = $.cookie("username");
        // alert(vtr);

        let candidate = $('#selectId').val();
        let url = `http://localhost:3000/votes/?firstname=${candidate}`;

        var uservote = localStorage.getItem("username");
        var isvotedvote = localStorage.getItem("isvoted");
        var fnamevote = localStorage.getItem("firstname");
        var mnamevote = localStorage.getItem("middlename");
        var lnamevote = localStorage.getItem("lastname");
        var dobvote = localStorage.getItem("dateOfBirth");
        var passvote = localStorage.getItem("password");
        var voteid = localStorage.getItem("id").toString();

        console.log(voteid);
        

        if(isvotedvote == "true"){
            alert("sorry, you have already voted");
            window.location.replace('./index.html');

        }

        else{

            $.ajax({

                type: 'GET',
                url: url,
                
                success: function (data) {
                    let count = data[0].votecount;
                    //let votercand = data[0].voters;
                    
                    count++;
                    $.ajax({
                        url: `http://localhost:3000/votes/${data[0].id}`,
                        method: "put",
                        data: {
                            firstname: candidate,
                            middlename: data[0].middlename,
                            lastname: data[0].lastname,
                            dateOfBirth: data[0].dateOfBirth,
                            party: data[0].party,
                            state: data[0].state,
                            votecount: count
                            
                            
                        },
                        success: function () {
                            alert("Thank you for voting");

                           
                            $.ajax({
                                
                                url: `http://localhost:3000/users/`+voteid,
                                type : 'PUT',
                                data: {
                                    firstname: fnamevote ,
                                    middlename: mnamevote,
                                    lastname: lnamevote,
                                    dateOfBirth: dobvote,
                                    username: uservote,
                                    password: passvote,
                                    isvoted: true
                                    
                                },

                                success: function(){
                                    //alert("set to true");
                                    window.location.replace('./index.html');
                                },
                                error: function(value){
                                    alert('error');
                                    console.log(value);


                                }

                            });
                        
                       
    
    
                        }
                    
                    });
                
                }
    
            })
        

        }
       
    });

    $("#adminlogin").click(function () {

        var aduser = $("#uname").val();
        var adpass = $("#pword").val();
        var adnumber = $("#adminId").val();

        var admin = {
            username: aduser,
            password: adpass,
            adminNo: adnumber

        };

        if (aduser == null || aduser == "", adpass == null || adpass == "", adnumber == null || adnumber == "") {
            alert("Please Fill All Required Field");
            return false;
        }

        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/admin',
            success: function (data) {
                var j = 1;
                for (let i of data) {
                    if (i.username == aduser && i.password == adpass && i.adminNo == adnumber) {
                        j = 0;
                        window.location.replace('./Adminpage.html');
                    }

                    if (j == 1) {
                        alert('username/password incorrect');

                    }
                }
            },
        });
    });

    $("#Addcandidate").click(function () {

        var firstname = $("#fname").val();
        var middlename = $("#mname").val();
        var lastname = $("#lname").val();
        var dateOfBirth = $("#dob").val();
        var party = $("#party").val();
        var state = $("#state").val();
        var votecount = $("#votecount").val();

        var candidate = {

            firstname: firstname,
            middlename: middlename,
            lastname: lastname,
            dateOfBirth: dateOfBirth,
            party: party,
            state: state,
            votecount: votecount

        };

        if (firstname == null || firstname == "", middlename == null || middlename == "",
            lastname == null || lastname == "", dateOfBirth == null || dateOfBirth == "",
            party == null || party == "", state == null || state == "",
            votecount == null || votecount == "") {
            alert("Please Fill All Required Field");
            return false;
        }

        else {

            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/votes',
                data: candidate,
                success: function () {
                    alert('Candidate Added');
                    window.location.replace('./Adminpage.html');
                },
            });

        }
    });

    $("#Updatecandidate").click(function () {

        var firstname = $("#upfname").val();
        var middlename = $("#upmname").val();
        var lastname = $("#uplname").val();
        var dateOfBirth = $("#updob").val();
        var party = $("#upparty").val();
        var state = $("#upstate").val();
        var id = $("#userid").val();
        var vcount = $("#votecounted").val();
        let url = `http://localhost:3000/votes/${id}`;

        var data = {
            firstname: firstname,
            middlename: middlename,
            lastname: lastname,
            dateOfBirth: dateOfBirth,
            party: party,
            state: state,
            votecount: vcount
        };

        $.ajax({
            url: url,
            method: "PUT",
            data: data,
            success: function (data) {
                alert("Candidate updated")
                window.location.replace('./Adminpage.html');
            }
        });

    });



});

