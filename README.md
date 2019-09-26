# Nina
Nina is a Node.js website where you can analyze the online personality of a person. To get started you can select a website or you can choose to write something. After submitting the username or text, you will then be presented with the results page. The results page will present a personality summary and will present the ordered personality percentiles.

## APIs used 
* [Watson Personality Insights](https://www.ibm.com/watson/services/personality-insights/)
* [Reddit](https://github.com/reddit-archive/reddit/wiki/api)
* [Twitter](https://developer.twitter.com/en/docs)

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
<!-- * Print out the names of the big5 traits. -->
<!-- * then worry about add the little traits. Maybe use an array with "one", "two"... -->
<!-- * Add functionality to dropdowns in results -->
<!-- * Add percentage bars and order by percentages -->
<!-- * Play with the limits for tweets and comments and check watson results in command line -->
<!-- * For the profile page create an object in the routes and then send that object to results.ejs -->
<!-- * Look at watson sample page and Test the analysis page with reddit results first. -->
<!-- * Find ibm node package, use it. -->
<!-- * add error handling for: user not found, etc. Maybe just print out the error message. Need twitter(invalid username) and watson(no comments) -->
<!-- * Styles to landing page text box and buttons. -->
* Responsiveness with window shrinkage. Issue with the percentage lines, has to do with display flex. Remove at a window size or google the issue
* Write 'complete' readme
* Load to netlify
<!-- * rename routes -->
<!-- * add a footer linking to the source code/github -->

## Features ideas
* Add the ability to combine and compare the personality's of people. Whether its comparing one person's personality on a commbination of websites or comparing multiple people on the same platform.

## What I learned
* Error handling for async functions. You have to catch the errors otherwise you'll get errors wrapped in a promise.
* Working with different modules to access API's
* How to correctly set up application only Oauth with the Reddit API
* Folder structure for node.js projects.
* Using gitignore