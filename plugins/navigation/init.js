
define(['./src/gpxRouteFeed'], function(GPXRouteFeed) {

  var routinoURL;

  function navigateTo(location) {
    dspace.world.addFeed(dspace.world.createFeed({
      type: 'GPXRoute',
      from: dspace.world.user.feed.avatar.getLatLon(),
      to: location,
      url: routinoURL
    }), true);
  }


  dspace.plugin('navigation', {
    name: "Navigation",
    description: "Route calculation & navigation, powered by a routino backend",
    version: '0.1',
    authors: ['Niklas E. Cathor <nilclass@riseup.net>'],

    hooks: {
      load: function(world) {
        routinoURL = world.config.user.routinoURL;
        if(typeof(routinoURL) !== 'string') {
          throw new Error(
            "Expected configuration option 'user.routinoURL' to be set!"
          );
        }
        world.addFeedType('GPXRoute', GPXRouteFeed);
      },

      mapCommands: {
        'navigate-here': function(point, location) {
          navigateTo(location);
        }
      },

      mapContextItems: {
        'navigate-here': "Navigate here"
      },

      featureCommands: {
        'start-navigation': {
          label: "Start Navigation",
          action: function(feature) {
            navigateTo(feature.getLatLon());
          }
        }
      }
    }
  });

});
