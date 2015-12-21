# vuejsTimer


INTRO

I needed a timer for my project, and found many pre-built jquery and javascript timers. However, I wanted a
vue.js timeout script, and they were few and far between. I am fairly new to the software engineering world,
so this is my first attempt at a vue.js timer.

This should be relatively straight forward to add to your project. It uses bootstrap for the slideDown
element, with a few lines of custom styling.



CODE

@mousemove is bound to the body element, which controls the user idle state.

    <body @mousemove="idleReset">

The idleTime is the internal timer, which keeps track of the user's idle state.

    idleTime: 3600

The UITime is the amount of time shown to the user, in the UI, before the session is expired.

    UITime: 120

I've commented the code to attempt to make it very easy to read.




INSTALLATION

1. Copy the following HTML into your HTML. Place this under your NAV if you want the warning to
appear at the top of the screen. If you want the warning to be full screen, make sure you
do not add this within the div container.

    ```html
    <div class="jumbotron UICountdown">
        <span>
            <h1>You will be logged out!</h1>
            <p>
                You have been idle for longer than {{ idleTime }} seconds. You will be
                logged out in {{ UICountdown }} seconds.
            </p>
            <button class="btn btn-primary btn-lg reset-button" @click="UIReset">Stay logged in</button>
        </span>
    </div>
    ```

2. Add the @mousemove to your body tag

    <body @mousemove="idleReset">


3. Add the following lines to the bottom of your HTML, just before the closing </body>

    ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.12/vue.js"></script>
    <script src="app.js"></script>
    ```

3a. Don't forget to add bootstrap to the head of your HTML.

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

4. Copy the app.js to your public root folder (or wherever you chose)

