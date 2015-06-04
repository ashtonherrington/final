window.onload = function () {
    
    process("myCode.php", xmlHttp);
    setTimeout(function(){console.log("From timeout");}, 10000);
 
}

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


function validateForm() {
     
     //first the length of the user supplied name and pw are determined
     var password = document.forms["createNewUser"]["newPW"].value;
     var username = document.forms["createNewUser"]["newUser"].value;
     console.log(password)
     console.log(username)
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
          var xmlHttp2 = createXmlHttpRequestObject();
          process1(username, password);

     }
}


function process1(username, password) {
    
    //confirmation that state is valid before taking actions
     if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {

          //URL provided, a get request is set to it, the server response function is set equal to the 
          //readstate change and the actual response is sent.
          var URL = "newUser.php?newUser=";
          URL += username;
          URL += "&";
          URL += "newPW=";
          URL += password;

          xmlHttp.open("GET", URL , true);
          xmlHttp.onreadystatechange = handleTheServerResponse;
          xmlHttp.send(null);                 
     }
     else {
          setTimeout('process()', 1000);
     }

     function handleTheServerResponse() {
     //first checks occur that the conditions are good
     if (xmlHttp.readyState == 4) {
          if (xmlHttp.status == 200) {
               var theResponse = xmlHttp.responseText;
               var masterDiv = document.getElementById("newResponse");
               masterDiv.innerHTML = "";
               masterDiv.innerHTML += theResponse;
          }
          else {
               console.log(xmlHttp.status)
               alert('Something went wrong.');
          }
     }     
}
}


function process(URL, xmlHttp) { //TESTLINE ADDED URL AS PARAMETER NOW ADDED xmlHttp as a variable
    
    //confirmation that state is valid before taking actions
     if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {

          //URL provided, a get request is set to it, the server response function is set equal to the 
          //readstate change and the actual response is sent.
          //var URL = "myCode.php"; //TESTLINE TEMPORARILY DELETED THIS FIELD
          xmlHttp.open("GET", URL , true);
          xmlHttp.onreadystatechange = handleServerResponse;
          xmlHttp.send(null);                 
     }
     else {
          setTimeout('process()', 1000);
     }

     function handleServerResponse() {
     //first checks occur that the conditions are good
       if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {

               if(URL == "myCode.php"){  //TESTLINE FOR A CONDITIONAL 
                   //the responsetext is placed in a hidden div
                   var theResponse = xmlHttp.responseText;
                   var hiddenDiv = document.getElementById("hiddenSection");
                 
                   var validUser = theResponse.substring(0, 1);
                   var realName = theResponse.substring(2);

                   hiddenDiv.innerHTML = "";
                   hiddenDiv.innerHTML += validUser; 

                   //the contents of the hidden div then determine which error message is displayed
                   var InnerText = hiddenDiv.textContent;
                   var thePage = document.getElementById("logTheeOut");
                   thePage.innerHTML = "Welcome, ";
                   if(realName.length > 0){
                   thePage.innerHTML += realName;
                   }
                   else{
                   thePage.innerHTML += "Guest";
                   }
                   if(InnerText == "1"){
                      displayExtra();
                      displayLogOut();            
                   }
                   else{
                      displayLogIn();
                   }
                   if(realName == "Ashton"){
                      displayAdmin();
                   }
                   document.getElementsByTagName("html")[0].style.visibility = "visible";  
                }
                else if(URL == "newUser.php"){
                  var FEEDBACK = xmlHttp.responseText;
                  var fillFeedBack = document.getElementById("newResponse");
                  fillFeedBack.innerHTML = "";
                  fillFeedBack.innerHTML += FEEDBACK;
                }
                else if(URL == "editUser.php"){
                  var FEEDBACK = xmlHttp.responseText;
                  var fillFeedBack = document.getElementById("editResponse");
                  fillFeedBack.innerHTML = "";
                  fillFeedBack.innerHTML += FEEDBACK;
                }
                
            }
            else {
                 alert('Something went wrong!');
            }
         }     
     }
}



function displayExtra(){
	var mainBar = document.getElementById("addedContent");
	var codePic = "<img id='pictures' src='img/myCodeFinal.png' alt='Welcome!'>";
	mainBar.innerHTML += codePic;
}

function displayAdmin(){
  var admin = document.getElementById("admin");
  var controlPanel = "<img id='mycode' src='img/admin.png' alt='admin!'>";
  admin.innerHTML += controlPanel;
}

function displayLogOut(){
  var thePage = document.getElementById("logTheeOut");  
	thePage.innerHTML += "<br>To log out, click <a href=\"main.php?action=end\">here</a>.";
}

function displayLogIn(){
  var thePage = document.getElementById("logTheeOut");  
  thePage.innerHTML += "<br>To log in, click <a href=index.html>here</a>.";

}
