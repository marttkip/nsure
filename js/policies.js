//login & registration functions
var Policies_service = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        return $.ajax({url: url + "/" + id});
    }

    this.motor_insurance = function(form_data) {
  		var request = url + "policies/motor_insurance";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
  
}

$(document).on("submit","form#motor_form",function(e)
{
	e.preventDefault();
	alert('sdada');
	//get form values
	var form_data = new FormData(this);
	
	
	//check if there is a network connection
	//var connection = checkConnection();
	var connection = "connected";
	
	if(connection != 'No network connection')
	{
		var service = new Policies_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		service.motor_insurance(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login
				
				// $( ".mainmenu #dashboard" ).css( "display", 'inline-block' );
				// $( ".mainmenu #profile" ).css( "display", 'inline-block' );
				// $( "#profile_icon" ).html( '<a href="profile.html" class="link icon-only" onclick="get_profile();"><img src="img/menu2.png" alt=""></a>' );

				// $("#login_response").html('<div class="alert alert-success center-align">'+"You have successfully logged in"+'</div>').fadeIn( "slow");

			

				// myApp.closeModal('.login-screen');
				// mainView.router.loadPage('dashboard.html');
			}
			else
			{
				// alert(data.result);
				// $("#login_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
				mainView.router.loadPage('dashboard.html');
			}
        });
	}
	
	else
	{
		alert("No internet connection - please check your internet connection then try again");
	}
	return false;
});


