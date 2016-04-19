define(['module'], function (module) {

   return{ 
       url: module.config().url,
       proxyPort: module.config().proxyPort,
       proxyIP: module.config().proxyIP,
       navBarItems: module.config().navBarItems,
       navBarLabels: module.config().navBarLabels
    };
   
});


 