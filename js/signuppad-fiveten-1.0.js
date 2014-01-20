/*
FiveTen timer.
*/

var fiveten = fiveten || {};
fiveten.FiveTenTimer = ( function() {

  var getCurrentTime = function() {
	return (new Date()).getTime();
  }

  var cls = function(pm, mp) {
    var counter = 0;
    var intervalMillis;
    var maxPeengs;
    if(pm) {
    	intervalMillis = pm;    // TBD: validation?	
    } else {
    	intervalMillis = 5000;  // 5 secs by default
    }
    if(mp) {
    	maxPeengs = mp;       // TBD: validation?
    } else {
    	maxPeengs = 10;       // 10 times by default.
    }

    this.reset = function() {
        counter = maxPeengs;  // ???
    };

    this.start = function() {
    	if(DEBUG_ENABLED) console.log("Starting peeng: intervalMillis = " + intervalMillis + "; maxPeengs = " + maxPeengs);

    	counter = 0;
    	this.peeng();
    };

    this.peeng = function() {
        ++counter;
    	if(counter > maxPeengs) {
    		return;
    	}
        var that = this;
        var peengUrl = 'http://www.signuppad.com/wp/fiveten';
/*
    	$.get(peengUrl, function(data, textStatus) {
    		var tis = that;
    		if(DEBUG_ENABLED) console.log("peeng(): counter = " + counter + "; textStatus = " + textStatus);
    		window.setTimeout(function() { tis.peeng(); }, intervalMillis);	
    	});
*/
        $.ajax({
            type: 'GET',
            url: peengUrl,
            dataType: "jsonp",
            success: function(data, textStatus) {
              // TBD
              // if(DEBUG_ENABLED) console.log("Successfully peeng'ed. textStatus = " + textStatus);
              // if(DEBUG_ENABLED) console.log("data = " + data);
              // if(DEBUG_ENABLED) console.log(data);

              var tis = that;
       		  if(DEBUG_ENABLED) console.log("peeng(): counter = " + counter + "; textStatus = " + textStatus);
    		  window.setTimeout(function() { tis.peeng(); }, intervalMillis);	

            },
            error: function(req, textStatus) {
              if(DEBUG_ENABLED) console.log("Failed to peeng. textStatus = " + textStatus);
              // Ignore...
            }
        });  // ajax
        
        
    };

  };

  return cls;
})();

