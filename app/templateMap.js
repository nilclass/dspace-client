define([
  'hbs!templates/mapContext',
  'hbs!templates/featureBoxItem',
  'hbs!templates/featureInfoModal',
  'hbs!templates/userOptionModal',
  'hbs!templates/statusPanel',
  'hbs!templates/overlayManager',
  'hbs!templates/featureDetails',
  'hbs!templates/addFeature',
  'hbs!templates/featureBox',
  'hbs!templates/featureTab'
], function(mapContext, featureBoxItem, featureInfoModal, userOptionModal, statusPanel, overlayManager, featureDetails, addFeature, featureBox, featureTab) {

  return {
    mapContext: mapContext,
    featureBoxItem: featureBoxItem,
    featureInfoModal: featureInfoModal,
    userOptionModal: userOptionModal,
    statusPanel: statusPanel,
    overlayManager: overlayManager,
    addFeature: addFeature,
    featureDetails: featureDetails,
    featureBox: featureBox,
    featureTab: featureTab
  };

});
