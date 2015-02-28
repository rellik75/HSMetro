define(['knockout', 'text!./hsthermostat.html'], function(ko, templateMarkup) {

  function Hsthermostat(params) {
    var self=this;s
  }

  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Hsthermostat.prototype.dispose = function() { };
  
  return { viewModel: Hsthermostat, template: templateMarkup };

});
