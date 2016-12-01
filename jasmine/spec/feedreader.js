/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('all have valid URLs', function() {
             allFeeds.forEach(function(feed){
               expect(feed.url).toBeDefined(); //checks if the URL is defined or not
               expect(feed.url.length).not.toBe(0); //checks if the URL is empty or not
             });
         });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('all have valid names', function() {
           allFeeds.forEach(function(feed){
             expect(feed.name).toBeDefined(); //checks if the name is defined or not, expected- to be defined
             expect(feed.name.length).not.toBe(0); //checks if the URL is empty or not, expected- the length is not null
           });
         });

    });


    /* A test suite named "The menu" */

    describe('The menu', function() {

      /* This is a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */

      it('is hidden by default', function() {
        //  expect((document.getElementsByTagName('body'))[0].className).toBe('menu-hidden');
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });

      /* This is a test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
       var bodyTag = document.getElementsByTagName('body');
       it('changes visibility when the menu icon is clicked', function() {
        //  expect((document.getElementsByTagName('body'))[0].className).toBe('menu-hidden'); // checks the default visibility
        expect($('body').hasClass('menu-hidden')).toBe(true);


         // checks the visibility when the menu icon is clicked consecutively
         document.querySelector(".menu-icon-link").click();
        //  expect((document.getElementsByTagName('body'))[0].className).not.toBe('menu-hidden'); // checks if the menu is visble
        expect($('body').hasClass('menu-hidden')).toBe(false);

         document.querySelector(".menu-icon-link").click();
        //  expect((document.getElementsByTagName('body'))[0].className).toBe('menu-hidden'); // checks if   the menu is hidden
        expect($('body').hasClass('menu-hidden')).toBe(true);

       });
    });


    /* A test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
            loadFeed(0, done);
         });

         it('has at least one entry present after the loadFeed function is called', function() {
            // expect(document.querySelectorAll('article.entry').length).toBeGreaterThan(0);
            expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(0);
            // checks the length of the list in the within the .feed container
         });
    });


    /* A test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {

      var initialLoad; // variable for the old feed
      var newLoad; // variable for the new feed

      /* This is a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */

       beforeEach(function(done) {
         loadFeed(0, function() {
           initialLoad = $('.feed').html(); // old feed
           loadFeed(1, done);
         });
       });

       it('changes the content when a new feed is loaded by the loadFeed function', function() {
         newLoad = $('.feed').html(); // new feed
         expect(initialLoad).not.toBe(newLoad);
       });

    });

}());
