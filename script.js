// Cache DOM elements
const button = $('button');
const envelope = $('.envelope');
var flipped = false;

// Function to animate the opening of the envelope
function pullOut() {
  return new TimelineMax()
    .to('.flap', 1, {
      rotationX: 180,
      ease: Power1.easeInOut
    }, 'scaleBack')
    .to('.invitation', 1, {
      scale: 0.8,
      ease: Power4.easeInOut,
    }, 'scaleBack')
    .set('.flap', {
      zIndex: 0
    })
    .to('.card', 1, {
      y: '0%',
      scaleY: 1.2,
      ease: Circ.easeInOut,
    })
    .set('.mask', {
      overflow: 'visible',  // Adjust the overflow property for visibility
      onComplete: function() {
        // Change Z-Index when animation is complete
        envelope.toggleClass('is-open');
      }
    })
    .to('.mask', 1.3, {
      'clip-path': 'inset(0 0 0% 0)',  // Adjust the mask clip path
      ease: Circ.easeInOut,
    }, 'moveDown')
    .to('.card', 1.3, {
      y: '100%',
      scaleY: 1,
      ease: Circ.easeInOut,
    }, 'moveDown')
    .to('button', 1, {
      y: '180px',
      ease: Circ.easeInOut,
      onComplete: toggleText  // Call toggleText when button animation finishes
    }, 'moveDown+=0.15');
}

// Function to handle flipping of the invitation card
function toggleFlip() {
  if (!envelope.hasClass('is-open')) {
    return;  // Do nothing if the envelope isn't open
  }

  // Toggle the Y-axis rotation based on the current flip state
  const ry = (!flipped) ? 180 : 0;
  flipped = !flipped;  // Flip the state

  // Animate the rotation of the card
  TweenMax.to('.card', 1, {
    rotationY: ry,
    ease: Power4.easeInOut,
    onComplete: toggleText  // Call toggleText when rotation is complete
  });
}

// Function to change the button text based on the flip state
function toggleText() {
  var text = !flipped ? 'Tell me more!' : 'See you there!';
  button.toggleClass('invert', !flipped)  // Toggle the invert class
        .text(text);  // Update button text
}

// Event listeners for button clicks
button.one('click', pullOut);  // Trigger pullOut animation once on first click
button.on('click', toggleFlip);  // Toggle the flip effect on subsequent clicks
