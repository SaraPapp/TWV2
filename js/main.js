$(document).ready(function () {
    // hide if clicked outside
    $(window).click(function (event) {
        if($(event.target).parents('.tabcontent').length == 0) {
            $(".countrybutton.active").removeClass("active");
            $(".tabcontent.active").removeClass("active");
        }
    });
$(".redbutton").click(function(event) {
    event.preventDefault(); // stop browser going to the link in the button
    event.stopPropagation();
    $(".countrybutton.active").removeClass("active");
    $(".tabcontent").removeClass("active");
    }
)
    // detect click on button
    $(".countrybutton").click(function (event) {
        event.preventDefault(); // stop browser going to the link in the button
        event.stopPropagation(); // stop other "click" functions to trigger in parent elements

        // if button is active, then hide the popup
        if ($(this).hasClass("active") === true) {
            $(".countrybutton.active").removeClass("active");
            $(".tabcontent").removeClass("active");
        } else {
            // if not then remove active from the current active button
            $(".countrybutton.active").removeClass("active");
            // add active to the button that was pressed
            $(this).addClass("active");

            // if popup is not showing, then show it
            if ($(".tabcontent").hasClass("active") === false) {
                $(".tabcontent").addClass("active");
            }

            // get the target chart section, related to the button
            var section = $(this).attr("href");//#australia
            //hide previously active section
            $(".chart.active").removeClass("active");
            //activate section
            $(section).addClass("active");
        } // closes if else statement
    }); // closes click event for countrybutton
}); // closes document ready

