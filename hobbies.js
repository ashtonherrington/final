window.onload = function () {
    process();
    process2();
};

//this creates a new XML HTTP request based on the state of the window
var xmlHttp = createXmlHttpRequestObject();
var xmlHttp2 = createXmlHttpRequestObject();

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

function process2() {
    
    //confirmation that state is valid before taking actions
     if (xmlHttp2.readyState == 0 || xmlHttp2.readyState == 4) {

          //URL provided, a get request is set to it, the server response function is set equal to the 
          //readstate change and the actual response is sent.
          var URL = "newSuggestions.php";
       
          console.log(URL)
          xmlHttp2.open("GET", URL , true);
          xmlHttp2.onreadystatechange = handleTheServerResponse;
          xmlHttp2.send(null);                 
     }
     else {
          setTimeout('process()', 1000);
     }

     function handleTheServerResponse() {
     //first checks occur that the conditions are good
     if (xmlHttp2.readyState == 4) {
          if (xmlHttp2.status == 200) {
               var theResponse = xmlHttp2.responseText;
               var masterDiv = document.getElementById("suggestionsList");
               masterDiv.innerHTML += theResponse;
          }
          else {
               console.log(xmlHttp2.status)
               alert('Something went wrong.');
          }
     }     
}
}

function confirmValidDate(){

  var goodDate = true;
  var skiprest = false;

  var month = document.forms["suggestForm"]["month"].value;
  var day = document.forms["suggestForm"]["day"].value;
  var year = document.forms["suggestForm"]["year"].value;
  
  if(month < 1 || month > 12){
    window.alert("This is not a valid date.");
    var goodDate = false;
    var skiprest = true;
  }
  if(skiprest == false){
    if(day <1 || day > 31){
      window.alert("This is not a valid date.");
      var goodDate = false;
      var skiprest = true;
    }
  }
  if(skiprest == false){
    if(year < 2015){
      window.alert("This is not a valid date.");
      var goodDate = false;
    }
  }

  if(goodDate == true){
    collectSuggestion();
  }
}



function collectSuggestion(){
  var month = document.forms["suggestForm"]["month"].value;
  var day = document.forms["suggestForm"]["day"].value;
  var year = document.forms["suggestForm"]["year"].value;
  var inputtext = document.getElementById("entered").value;
  console.log(inputtext)
  processSuggestion(day, month, year, inputtext);
    
}   



function processSuggestion(day, month, year, statement) {
    
    //confirmation that state is valid before taking actions
     if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {

          //URL provided, a get request is set to it, the server response function is set equal to the 
          //readstate change and the actual response is sent.
          var URL = "newSuggest.php?day=";
          URL += day;
          URL += "&";
          URL += "month=";
          URL += month;
          URL += "&";
          URL += "year=";
          URL += year;
          URL += "&";
          URL += "suggestion=";
          URL += statement;
          console.log(URL)
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
               var masterDiv = document.getElementById("enterSuggestion");
               masterDiv.innerHTML += theResponse;
          }
          else {
               console.log(xmlHttp.status)
               alert('Something went wrong.');
          }
     }     
}
var logDiv = document.getElementById("suggestionsList");
logDiv.innerHTML = "";
setTimeout(function(){console.log("From timeout");}, 10000);
process2();
}




function handleServerResponse() {
     //first checks occur that the conditions are good
     
     function addSuggest(){
      var suggest = document.getElementById("enterSuggestion");
      var suggestForm = "Suggest something I may like!<br><br><form id='suggestForm' action='newSuggest.php' method='GET'>Please enter current date:<br> Month:<input type='number' name='month' min='1' max='12'>Day:<input type='number' name='day' min='1' max='31'>Year:<input type='number' name='year' min='2015'><br><br>Please enter your suggestion:<br><textarea rows='5' style='width:90%' id='entered'></textarea><br><br><input type='button' onclick='confirmValidDate()' value ='Offer suggestion' '/></form>";
      suggest.innerHTML += suggestForm;
     }

     if (xmlHttp.readyState == 4) {
          if (xmlHttp.status == 200) {

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
                  addSuggest();          
               }
               else{
                  displayLogIn();
               }
               console.log(realName)
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


