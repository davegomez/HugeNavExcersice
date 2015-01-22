  // Create the state-indicator element
  var indicator = document.createElement('div');
  indicator.className = 'state-indicator';
  document.body.appendChild(indicator);

  // Create a method which returns device state
  var getDeviceState = function () {
    return parseInt(window.getComputedStyle(indicator).getPropertyValue('z-index'), 10);
  };


