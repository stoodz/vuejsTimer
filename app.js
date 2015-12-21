new Vue({
    el: 'body', // use the body element so we have mousemove on the entire document

    data: { // config values
    idleTime: 3600, // The internal timer that tracks idle time, is reset on event. Set this to your timeout value in seconds
    idleCountdown:null, // Populated at runtime by idleTime value. This value decrease every second until timeout is reached
    idleTimeout: false, // Timeout status toggle
    UITime: 120, // Total time before UI performs action. Set this to your desired countdown to your users
    UICountdown: null, // Populated by uiTime on idleTimeout, UI countdown decreases every second until timeout is reached
    UITimeout: false // UI timeout status toggle
    },

    methods: {

    // ************************************* START IDLE COUNTDOWN ************************************* //

    // This starts the internal timer. The internal timer is started automatically
    // on page load. The internal timer will be reset everytime a mouse, click,
    // key event occurs, which means the user is active, on timeout, call
    // the countDown timer which is visible to the UI
    startIdleCountdown: function () {
    $('.UICountdown').hide();                               // hides the UI warning window
    this.idleCountdown = this.idleTime;                     // initialize the timer with idle timeout config value
    this.setIdleTimer = setInterval(this.idleTimer, 1000);  // starts the timer. setTimer is used to clear/reset idleTimer
    },

    // This is the method that counts down the idle time. Every 1000 ms an additional
    // second is removed from the timer. Once the count hits zero, the UI is
    // displayed and we call the uiCountDown
    idleTimer: function () {
    this.idleCountdown = this.idleCountdown - 1;        // decrement idleCountdown every second

    if(!this.idleCountdown){                            // if countdown is zero timeout is achieved
    clearInterval(this.setIdleTimer);               // clear timer
    this.idleTimeout = !this.idleTimeout;           // toggle the idle timeout status

    this.startUICountdown();                        // start the UI timer
    }
    },

    // reset idle timer on mouse or key event.
    idleReset: function () {
    if(!this.idleTimeout) {                                 // reset idle countdown only if idle timeout has not expired
    clearInterval(this.setIdleTimer);                   // reset the UI timer
    this.startIdleCountdown();                          // start the idle countdown
    }
    },

    // ************************************* START UI COUNTDOWN ************************************* //

    // Starts the UI countdown, and displays the warning to user
    startUICountdown: function () {
    $('.UICountdown').slideDown(2000);                    // display the UI warning window
    this.UICountdown = this.UITime;                     // initialize the UI timer with UI timeout config value
    this.setUITimer = setInterval(this.UITimer, 1000);  // start UI timer. setUITimer is used to reset UITimer
    },

    // the countdown timer decrements the UICountdown value until zero
    UITimer: function () {
    this.UICountdown = this.UICountdown - 1;            // decrement UI countdown every second

    if(!this.UICountdown){                              // the countdown is complete, take action
    clearInterval(this.setUITimer);                 // reset the UI timer
    this.UITimeout = !this.UITimeout;               // toggle UI timeout status. Use for future events

    this.countdownExpired();                        // post UI countdown expiry events
    }
    },

    // If the UI reset button is clicked, we start from the beginning
    UIReset: function () {
    clearInterval(this.setUITimer);                     // reset the UI timer
    this.idleTimeout = !this.idleTimeout;               // Toggle idleTimeout status
    this.startIdleCountdown();                          // start the idle countdown
    },

    // ************************************* COUNTDOWN EXPIRED EVENTS ************************************* //

    countdownExpired: function () {
    window.location = "/logout";
    }
    },

    ready: function () {
    this.startIdleCountdown();
    }
    });
