// script.js

$(document).ready(function () {
    // Fetch testimonials dynamically from testimonials.json and render them
    fetchTestimonials();

    // Search functionality
    $("#search-bar").on("input", function () {
        filterTestimonials($(this).val());
    });
});

// Function to fetch testimonials dynamically from testimonials.json
function fetchTestimonials() {
    // Use AJAX or Fetch API to load testimonials.json
    $.getJSON("testimonials/testimonials.json", function (data) {
        // Render testimonials in the carousel
        renderTestimonials(data);
    }).fail(function (jqxhr, textStatus, error) {
        console.error("Error fetching testimonials: " + textStatus + ", " + error);
    });
}

// Function to render testimonials in the carousel
function renderTestimonials(testimonials) {
    var carousel = $("#testimonial-slider");

    // Clear existing items
    carousel.owlCarousel("destroy");

    // Append new items
    testimonials.forEach(function (testimonial) {
        var item = $("<div class='testimonial'></div>");

        // Append testimonial content
        item.append("<p class='description'>" + testimonial.text + "</p>");
        item.append("<div class='pic'><img src='" + testimonial.pictureURL + "' alt=''></div>");
        item.append("<h3 class='title'>" + testimonial.name + "</h3>");
        item.append("<span class='post'>" + testimonial.designation + "</span>");

        carousel.append(item);
    });

    // Initialize Owl Carousel
    carousel.owlCarousel({
        items: 1,
        itemsDesktop: [1000, 1],
        itemsDesktopSmall: [979, 1],
        itemsTablet: [768, 1],
        pagination: false,
        navigation: true,
        navigationText: ["", ""],
        autoPlay: true
    });
}

// Function to filter testimonials based on search query
function filterTestimonials(query) {
    var carousel = $("#testimonial-slider");
    var testimonials = carousel.find(".testimonial");

    // Reset styles and show all testimonials
    testimonials.show();
    testimonials.find(".description").css("background-color", "transparent");

    // Check if the query is not empty
    if (query.trim() !== "") {
        // Loop through testimonials and filter based on the query
        testimonials.each(function () {
            var testimonial = $(this);
            var description = testimonial.find(".description").text().toLowerCase();
            var match = description.includes(query.toLowerCase());

            if (!match) {
                testimonial.hide();
            } else {
                // Highlight matching words
                highlightKeywords(testimonial.find(".description"), query);
            }
        });
    }
}

// Function to highlight search keywords in testimonials
function highlightKeywords(element, keywords) {
    var text = element.text();
    var highlightedText = text.replace(new RegExp(keywords, "gi"), function (match) {
        return "<span class='highlight'>" + match + "</span>";
    });
    element.html(highlightedText);
}
