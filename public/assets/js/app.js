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

// on the page load, call display functions
$(function() {
    setTimeout(displayContainer, 1000);
    setTimeout(displaySwitch, 2000);
});