$(document).ready(function () {
    // Function to be called multiple times for rendering a single bar
    // Parsing the element which we specify previously in the "each" loop
    function chartBarRender(element, value) {
        // if value is negative
        console.log($(window).outerWidth());
        if ($(window).outerWidth() < 768) {
            // mobile
            if (value < 0) {
                // Change the text and class of the title-container
                element.find('.percentage').html(value + '%').addClass('percentageminus').removeClass('percentageplus');
                // make green bar flat
                element.find('.topcolumn').removeAttr('style').animate({'width': 0}, 250);
                // make grey bar not flat
                element.find('.bottomcolumn').removeAttr('style').animate({'width': (value * -1) + '%'}, 250);
            } else { // if not negative then is positive
                element.find('.percentage').html('+' + value + '%').removeClass('percentageminus').addClass('percentageplus');
                // make gray bar flat
                element.find('.bottomcolumn').removeAttr('style').animate({'width': 0}, 250);
                // make green bar not flat
                element.find('.topcolumn').removeAttr('style').animate({'width': value + '%'}, 250);
            }
        } else {
            // tablet
            if (value < 0) {
                // Change the text and class of the title-container
                element.find('.percentage').html(value + '%').addClass('percentageminus').removeClass('percentageplus');
                // make green bar flat
                element.find('.topcolumn').removeAttr('style').animate({'height': 0}, 250);
                // make grey bar not flat
                element.find('.bottomcolumn').removeAttr('style').animate({'height': (value * -1) + '%'}, 250);
            } else { // if not negative then is positive
                element.find('.percentage').html('+' + value + '%').removeClass('percentageminus').addClass('percentageplus');
                // make gray bar flat
                element.find('.bottomcolumn').removeAttr('style').animate({'height': 0}, 250);
                // make green bar not flat
                element.find('.topcolumn').removeAttr('style').animate({'height': value + '%'}, 250);
            }
        }
    }

    function dealWithData(data){
        var total = 0; // total of percentages
        // for each element of the data (CA, MX,...) render the bar and the text
        $.each(data, function (index, value) {
            // Setting up the "target element"
            var element = $('.stats .data:eq( ' + index + ' )');
            // Render the Chart
            chartBarRender(element, value);
            // Add value to total
            total = total + value;
        });

        // average of total
        total = total / data.length;
        total = total.toFixed(1);

        // Render total
        chartBarRender($('.js-total-column'), total);
    }

    var timeout;
    $(window).on('resize', function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            var data = JSON.parse($('.countrybutton.active').attr('data-values'));
            dealWithData(data);
        }, 250);
    });

    // hide if clicked outside
    $(window).click(function (event) {
        if ($(event.target).parents('.tabcontent').length == 0) {
            $(".countrybutton.active").removeClass("active");
            $(".tabcontent.active").removeClass("active");
        }
    });
    $(".redbutton").click(function (event) {
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

        // Data: This would come from an API call
        var data = JSON.parse($(this).attr('data-values'));
        dealWithData(data);

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

