/*
SignupPad signup() helper.
*/


// SignupManager object.
var webstoa = webstoa || {};
webstoa.SignupManager = ( function() {

  var cls = function(servicename, launchname, pageid) {
      this.serviceName = servicename ? servicename : '';
      this.launchName = launchname ? launchname : '';
      this.pageId = pageid ? pageid : '';
      
      var successCallback;
      var failureCallback;
      this.setSuccessCallback = function(successCallback) {
        this.successCallback = successCallback;
      };
      this.setFailureCallback = function(failureCallback) {
        this.failureCallback = failureCallback;
      };

      this.signup = function(email, comment) {
        var that = this;  // ???

    	if(DEBUG_ENABLED) {
            console.log("Signup() called with email = " + email);
            console.log("comment = " + comment);
        }
        email = email ? email : '';
        comment = comment ? comment : '';
      	if(DEBUG_ENABLED) console.log("Signup: email = " + email + "; comment = " + comment);
        var commentLen = comment.length;
        if(commentLen > 500) {  // Max 500 chars
            comment = comment.substring(0, 500);
            if(DEBUG_ENABLED) console.log("Comment has been truncated to: " + comment);
        }
/*
        if(!email) {  // Or, invalid
            // TBD:
            // Error...
            if(this.failureCallback) {
                // window.alert("Please specify email address.");
                this.failureCallback();
            } else {
                window.alert("Please specify email address.");
            }
            return false; // ???
        }
*/

        var signupObj = {};
        signupObj.serviceName = this.serviceName;
        signupObj.launchName = this.launchName;
        signupObj.originDomain = window.location.hostname;
        signupObj.originPage = this.pageId;
        signupObj.originButton = '';
        signupObj.referralPage = window.location.href;
        signupObj.comment = comment;
        signupObj.signupTime = (new Date()).getTime();
        var notificationPref = {};
        notificationPref.preferredMode = 'email';  // ???
        notificationPref.emailAddress = email;
        signupObj.notificationPref = notificationPref;
        
        var referrerInfo = {};
        referrerInfo.referer = document.referrer;
        referrerInfo.userAgent = navigator.userAgent;
        referrerInfo.language = navigator.language;
        //referrerInfo.hostname = "";
        //referrerInfo.ipAddress = "";
        signupObj.referrerInfo = referrerInfo;

        // temporary
        //var signupPadUrl = 'http://localhost:8899/wp/signup';
        var signupPadUrl = 'http://www.signuppad.com/wp/signup';
        var payload = JSON.stringify(signupObj);
        // Need to url encode the payload....
        var encodedPayload = encodeURIComponent(payload);
        var payloadParam = '?payload=' + encodedPayload;
        signupPadUrl += payloadParam;
        $.ajax({
            type: 'GET',
            url: signupPadUrl,
            dataType: "jsonp",
            success: function(data, textStatus) {
              // TBD
              if(DEBUG_ENABLED) console.log("Successfully signed up. textStatus = " + textStatus);
              if(DEBUG_ENABLED) console.log("data = " + data);
              if(DEBUG_ENABLED) console.log(data);

              // TBD:
              if(that.successCallback) {
                  // window.alert("Thanks for signing up. Success.");
                  that.successCallback();
              } else {
                  window.alert("Thanks for signing up.");
              }
            },
            error: function(req, textStatus) {
              if(DEBUG_ENABLED) console.log("Failed to sign up. textStatus = " + textStatus);

              // TBD:
              if(that.failureCallback) {
                  // window.alert("Signup failed. Please try again. Failure.");
                  that.failureCallback();
              } else {
                  window.alert("Signup failed. Please try again.");
              }
            }
        });  // ajax
      };  // signup
  }; // cls
  return cls;
})();

