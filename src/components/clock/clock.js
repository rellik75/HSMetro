define(['knockout', 'text!./clock.html'], function (ko, templateMarkup) {

    function Clock(params) {
        self = this;
        var color = params.color;
        self.classInfo = ko.observable("live-tile two-wide exclude accent " + color);

        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                
        setInterval(function () {
            var hours = new Date().getHours();
            var minutes = new Date().getMinutes();
            var seconds = new Date().getSeconds();
            var newDate = new Date();
            // Extract the current date from Date object
            newDate.setDate(newDate.getDate());
            // Output the day, date, month and year   
            $('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
            // Add a leading zero to the hours value
            $("#hours").html((hours < 10 ? "0" : "") + hours);
            $("#min").html((minutes < 10 ? "0" : "") + minutes);
            $("#sec").html((seconds < 10 ? "0" : "") + seconds);
        }, 1000);
        
        
        /*setInterval(function () {
            // Create a newDate() object and extract the seconds of the current time on the visitor's
            var seconds = new Date().getSeconds();
            // Add a leading zero to seconds value
            $("#sec").html((seconds < 10 ? "0" : "") + seconds);
        }, 1000);

        setInterval(function () {
            // Create a newDate() object and extract the minutes of the current time on the visitor's
            var minutes = new Date().getMinutes();
            // Add a leading zero to the minutes value
            $("#min").html((minutes < 10 ? "0" : "") + minutes);
        }, 1000);

        setInterval(function () {
            // Create a newDate() object and extract the hours of the current time on the visitor's
            var hours = new Date().getHours();
            // Add a leading zero to the hours value
            $("#hours").html((hours < 10 ? "0" : "") + hours);
        }, 1000);*/

    };


    // This runs when the component is torn down. Put here any logic necessary to clean up,
    // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    Clock.prototype.dispose = function () {};

    return {
        viewModel: Clock,
        template: templateMarkup
    };

});