function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
var visits = function(){

    var visits = getCookie("numofvisits");    
    if (!visits) { visits = 1;
    setCookie("numofvisits", visits);
    document.getElementById("cookie").innerHTML = "This is your first time visiting here!";
    
    }
    
    else {
    console.log("hi");
    visits = parseInt(visits) + 1;
    document.getElementById("cookie").innerHTML = "You have been here " + visits + " times.";
    setCookie("numofvisits", visits);
}
}

visits();