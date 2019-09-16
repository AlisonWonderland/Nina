# Nina


## Todo 
<!-- * Add submit button for text box -->
<!-- * Send text through the inputs and see if you get right output. use send. STILL NEED
TEXTAREA INPUT -->
<!-- * Get tweet data -->
<!-- * Get reddit data -->
<!-- * Make IBM API work -->
<!-- * Make reddit data work with IBM's API with the separate files. Probably will have to 'require' ibm code. -->
<!-- * put reddit/twitter routes/functions in separate files. test it. MOVE FILES TO HELPERS FOLDER -->
<!-- * For self text make sure the amount of words is 600. This will need to be done in client side code. ADD WORD COUNT. ADD LITTLE MESSAGE UNDER TEXTAREA SAYING 600 IS THE MINIMUM NEED BY THE API TO BE ACCURATE. -->
* Play with the limits for tweets and comments and check watson results in command line
* For the profile page create an object in the routes and then send that object to results.ejs
* Look at watson sample page and Test the analysis page with reddit results first.
* Create new ejs page to load this data(prefered) or add loading animation.
* Find ibm node package, use it.
* add error handling for: user not found, etc. Maybe just print out the error message.
* Styles. *** USE LANDING PAGE CSS FILE FOR THE DATA PAGE ***
* Responsiveness. sockets
* rename routes

## Notes 


### Todo later 
* Get new background color for landing
### Refactoring ideas.
Put twitter and reddit api request functions in their own js files in 'public' like Ninas-insights.

## Acroynms I used
'ws' means website

## What I learned
* Error handling for async functions. You have to catch the errors otherwise you'll get errors wrapped in a promise.