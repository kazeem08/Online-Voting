$(document).ready(function(){

    $('#register-form').submit(function(event){
        const redirectToDashboard = function(data, status, jqXHR) {
            if(typeof(data) == 'object') {
                window.location.replace('../votingpage.html');
            }
        };
    });

});
   
        // $('#login-form').submit(function(event) {
    //     const redirectToDashboard = function(data, status, jqXHR) {
    //         if(typeof(data) == 'object' && data.length > 0) {
    //             window.location.replace('http://localhost:5000/dashboard.html');
    //         } else{
    //             $('#alert').html('<h2>User does not exit</h2>');
    //         }
    //     };
    //     $.get(`http://localhost:3000/users/?email=${$('#staffMail').val()}&password=${$('#loginPswd').val()}`, redirectToDashboard);
    //     event.preventDefault();
    // });
    
   
    //     if ($('#password').val() !== $('#password-rpt').val()) {
    //         alert("Your password does not match");
    //     } else {
    //         const data = {
    //             email:  $('#email').val(),
    //             password: $('#password').val(),
    //             level: $('#level').val()
    //         };
    //         $.post('http://localhost:3000/users', data, redirectToDashboard, 'json');
    //         event.preventDefault();
    //     }
    // });
    // $('#dashboard-form').submit(function(event) {
        
    //     }
    // });
// });
