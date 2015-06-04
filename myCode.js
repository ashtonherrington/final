var xmlHttp = createXmlHttpRequestObject();
var xmlHttp2 = createXmlHttpRequestObject();
var xmlHttp3= createXmlHttpRequestObject();
var xmlHttp4 = createXmlHttpRequestObject();


window.onload = function () {
    
    process("myCode.php", xmlHttp);
    setTimeout(function(){console.log("From timeout");}, 10000);

    var hidden = document.getElementById("hiddenSection");
    var hiddenText = hidden.innerHTML;
    console.log(hiddenText)
    if(hiddenText != "1"){
      //badUser();    
    }
    process("feedback1.php", xmlHttp2);
    setTimeout(function(){console.log("From timeout");}, 10000);
    process("feedback2.php", xmlHttp3);
    setTimeout(function(){console.log("From timeout");}, 10000);
    process("feedback3.php", xmlHttp4);
};

//this creates a new XML HTTP request based on the state of the window


function badUser(){
  var URL = "index.html";
  window.location = URL;
}


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
                else if(URL == "feedback1.php"){
                  var FEEDBACK = xmlHttp.responseText;
                  var fillFeedBack = document.getElementById("feedback1");
                  fillFeedBack.innerHTML = "";
                  fillFeedBack.innerHTML += FEEDBACK;
                }
                else if(URL == "feedback2.php"){
                  var FEEDBACK = xmlHttp.responseText;
                  var fillFeedBack = document.getElementById("feedback2");
                  fillFeedBack.innerHTML = "";
                  fillFeedBack.innerHTML += FEEDBACK;
                }
                else if(URL == "feedback3.php"){
                  var FEEDBACK = xmlHttp.responseText;
                  var fillFeedBack = document.getElementById("feedback3");
                  fillFeedBack.innerHTML = "";
                  fillFeedBack.innerHTML += FEEDBACK;
                } 
                else if(URL == "security.php"){
                  var security = xmlHttp.responseText;                  
                  var hiddenDiv2 = document.getElementById("hiddenSection2");
                  hiddenDiv2.innerHTML = "";
                  hiddenDiv2.innerHTML += security;
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
	var codePic = "<img id='mycode' src='img/myCodeFinal.png' alt='Welcome!'>";
	mainBar.innerHTML += codePic;
}

function displayAdmin(){
  var admin = document.getElementById("admin");
  var controlPanel = "<img id='pictures' src='img/admin.png' alt='admin!'>";
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
