//onload function clears any contents of the AJAX related divs that display user messages
window.onload = function () {
     var masterDiv = document.getElementById("dynamicSection");
     masterDiv.innerHTML = "";
     var hiddenDiv = document.getElementById("hiddenSection");
     hiddenDiv.innerHTML = "";

};

function guestLogin(){
  window.location = "main.html";
}


function test1(username, password) {
  var password = document.forms["inputform"]["password"].value;
  var username = document.forms["inputform"]["username"].value;
  var URL = "main.html";
  window.location = URL;
}


function test2() {
    var masterDiv = document.getElementById("dynamicSection");
     masterDiv.innerHTML = "Error, invalid user credentials.";

}

//validateForm confirms the data provided by the user is good, otherwise issues an error
function validateForm() {
     
     //first the length of the user supplied name and pw are determined
     var password = document.forms["inputform"]["password"].value;
     var username = document.forms["inputform"]["username"].value;
     var pwLen = password.length;
     var userLen = username.length;
     var goodData = true;
     var skipOthers = false;

     //if both are invalid this runs and the further error messages are skipped
     if(userLen <6 && pwLen <6){  
          alert("Your username and password must both be at least 6 characters long.")
          goodData = false;
          skipOthers = true;
     }

     //if the further error messages are not skipped
     if(skipOthers === false){
         //if userlength is too short this runs
         if (userLen < 5) {
             alert("Usernames must be at least 5 characters long.");
             goodData = false;
         }
         //or if password length is too short this runs
         if (pwLen < 6) {
             alert("Passwords must be at least 6 characters long.");
             goodData = false;
         }
     }
     //if no error flag has been set a XML request object is created and then processed
     if(goodData == true){
          var xmlHttp = createXmlHttpRequestObject();
          process(username, password);

     }
}

//this creates a new XML HTTP request based on the state of the window
var xmlHttp = createXmlHttpRequestObject();
function createXmlHttpRequestObject() {

     var xmlHttp;

     //test to determine if the window is Active X
     if (window.ActiveXObject) {
          try{
               xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e) {
               xmlHttp = false;
          }

     }
     //otherwise a XMLHTTPRequest object is created
     else {
          try {
               xmlHttp = new XMLHttpRequest();
          } catch (e) {
               xmlHttp = false;
          }
     }
     //if an error occurs it is presented to the user
     if (!xmlHttp)
          alert("Error processing XML Http Request object.");
     //and finally the function returns the newly created object
     else
          return xmlHttp;
}

//process checks if the readystate is good and then sends the XMLHTTPRequest
function process(username, password) {
    
    //confirmation that state is valid before taking actions
     if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {

          //URL provided, a get request is set to it, the server response function is set equal to the 
          //readstate change and the actual response is sent.
          var URL = "index_response.php?username=";
          URL += username;
          URL += "&";
          URL += "password=";
          URL += password;

          xmlHttp.open("GET", URL , true);
          xmlHttp.onreadystatechange = handleServerResponse;
          xmlHttp.send(null);                 
     }
     else {
          setTimeout('process()', 1000);
     }
}

//this determines what the xmlHTTP object does with the response
function handleServerResponse() {
     //first checks occur that the conditions are good
     if (xmlHttp.readyState == 4) {
          if (xmlHttp.status == 200) {

               //the responsetext is placed in a hidden div
               var theResponse = xmlHttp.responseText;
               var masterDiv = document.getElementById("hiddenSection");
               masterDiv.innerHTML = "";
               var displayDiv = document.getElementById("dynamicSection");
               displayDiv.innerHTML = "";
               masterDiv.innerHTML += theResponse;

               //the contents of the hidden div then determine which error message is displayed
               var InnerText = masterDiv.textContent;
               if(InnerText == "success"){
                  test1();
               }
               else{
                  test2();
               }

          }
          else {
               alert('Something went wrong!');
          }
     }     
}