// ==============================================================================
// Set Global Variables
// ==============================================================================

var carousel;


// ==============================================================================
// functions for displaying the container and switch div when the page loads
// ==============================================================================

// display the main container
function displayContainer() {
    $('.container').fadeIn(750);
}

// display the switch div
function displaySwitch() {
    $('#switch-container').fadeIn(1500);
}

// display the worlds container div
function displayWorlds() {
    setTimeout(function() {
        $('#worlds-container').fadeTo(750, 1);
    }, 1000);
}

// hide the worlds container div
function hideWorlds() {
    $('#worlds-container').fadeTo(500, 0);
}

// on the page load, call display functions
$(function() {
    setTimeout(displayContainer, 1000);
    setTimeout(displaySwitch, 2000);
    initializeCarousel();
});

// ==============================================================================
// Carousel Controls
// Initialize the flickity carousel & populate it
// ==============================================================================

function initializeCarousel() {
    carousel = $(".worlds-carousel").flickity({
        freeScroll: true,
        wrapAround: true,
        autoPlay: 3000,
        imagesLoaded: true,
        pageDots: false,
        prevNextButtons: false,
        pauseAutoPlayOnHover: true,
        draggable: false
    });

    getWorldImages();
}

function getWorldImages() {

    // get the worlds data
    $.get('/api/images', function (worlds) {

        // clear the flickity container before populating it
        carousel.flickity('remove', $('.carousel-cell'));

        // display the container
        displayWorlds();

        // for each world, check if the world was destroyed.  
        // if not, create the carousel container for the image and add it to the carousel
        for (var i = 0; i < worlds.length; i++) {

            if (worlds[i].id) {
                var carouselCell = $('<div class="carousel-cell">');
                var carouselImage = $('<img class="world-image">');
                carouselImage.attr('src', '/assets/images/' + worlds[i].image_slug + '.jpg');
                carouselImage.attr('data-id', worlds[i].id);
                carouselImage.appendTo(carouselCell);
                carousel.flickity('append', carouselCell);
            }
        }
    });
}

function restartCarousel() {
    carousel.flickity('playPlayer');
}

// ==============================================================================
// Displaying world data side modals
// ==============================================================================

var modalOpen = false;
var openModalName = '';

function openSideNav() {

    modalOpen = true;
    var currentModal = document.getElementById(openModalName + "-data-modal");
    
    // set the width of the side modal so that it is displayed
    currentModal.style.left = "0";

    // add the sidemodal-backdrop class to create a dark opaque background behind the side modal
    $(".side-modal-bg").addClass("side-modal-backdrop");

    // add focus to the open modal
    currentModal.focus();

    // prevent body from being scrollable
    $("body").addClass('lock-scroll');

}

function closeSideNav() {

    modalOpen = false;
    var currentModal = document.getElementById(openModalName + "-data-modal");

    currentModal.style.left = "-250px";
    $(".side-modal-bg").removeClass("side-modal-backdrop");

    $("body").removeClass('lock-scroll');

    restartCarousel();

    openModalName = "";
}


// ==============================================================================
// Event Listeners
// ==============================================================================

// create world listener
$(document).on('click', '#create-button', function() {

    $.post('/api/create', function(response) {

        console.log('created a new world');

        // hide the worlds container
        hideWorlds();

        // reload the page to get the updated worlds
        getWorldImages();
    });
});

// open world data side modal listener
$(document).on('click', '.world-image', function() {

    // get the id for the image
    var worldId = $(this).attr('data-id');

    openModalName = worldId;

    // pass the id into the openSideNav function
    openSideNav();
});

// close world data side modal keyCode listener
$(document).keyup(function(e) {
    if (modalOpen && e.keyCode === 27) {
        closeSideNav();
    }
});

// close world data side modal on esc. key click
$('.side-modal-bg').mousedown(function(e) {

    var currentModal = document.getElementById(openModalName + "-data-modal");

    if (! $(e.target).is(currentModal)) {
        closeSideNav();
    } 
});