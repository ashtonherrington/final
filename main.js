window.onload = function () {
    process();
};

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

function process() {
    
    //confirmation that state is valid before taking actions
     if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {

          //URL provided, a get request is set to it, the server response function is set equal to the 
          //readstate change and the actual response is sent.
          var URL = "main.php";
          xmlHttp.open("GET", URL , true);
          xmlHttp.onreadystatechange = handleServerResponse;
          xmlHttp.send(null);                 
     }
     else {
          setTimeout('process()', 1000);
     }
}

function handleServerResponse() {
     //first checks occur that the conditions are good
     if (xmlHttp.readyState == 4) {
          if (xmlHttp.status == 200) {

               //the responsetext is placed in a hidden div
               var theResponse = xmlHttp.responseText;
               var hiddenDiv = document.getElementById("hiddenSection");
               var validUser = theResponse.substring(0, 1);
               var realName = theResponse.substring(2);
               console.log(realName)
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
          else {
               alert('Something went wrong!');
          }
     }     
}

function displayExtra(){
	var mainBar = document.getElementById("addedContent");
	var codePic = "<img id='mycode' src='img/myCodeFinal.png' alt='Welcome!'>";
	mainBar.innerHTML += codePic;

}

function displayLogOut(){
   	var thePage = document.getElementById("logTheeOut");
    
	thePage.innerHTML += "<br>To log out, click <a href=\"main.php?action=end\">here</a>.";

}

function displayLogIn(){
    var thePage = document.getElementById("logTheeOut");
    
  thePage.innerHTML += "<br>To log in, click <a href=index.html>here</a>.";

}

function displayAdmin(){
  var admin = document.getElementById("admin");
  var controlPanel = "<img id='pictures' src='img/admin.png' alt='admin!'>";
  admin.innerHTML += controlPanel;
}