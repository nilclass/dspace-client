define([
  'remoteStorage',
  'views/modal/widgetModal',
  'hbs!templates/widgetRemotestorage'
], function( remoteStorage, WidgetModal, widgetRemotestorageTemplate) {

  // SEE http://remotestoragejs.com/doc/code/files/lib/widget/default-js.html
  // FOR AN INCOMPLETE REFERENCE OF THE REMOTESTORAGE WIDGET VIEW API.

  var events = remoteStorage.util.getEventEmitter(
    'connect', 'disconnect', 'sync', 'reconnect',
    'state' // << used internally to link widgetView -> widgetRemotestorage
  );

  var widgetView = remoteStorage.util.extend({
    display: function() {
      this.state = 'initial';
    },

    setState: function(state) {
      // TODO: change appearance of icon (spinning, offline etc)
      console.log("REMOTESTORAGE STATE", state);
      this.state = state;
      this.emit('state', state);
    },

    redirectTo: function(url) {
      document.location = url;
    },

    setUserAddress: function(userAddress) {
      // TODO: implement this if necessary.
    },

    getLocation: function() {
      return document.location.href;
    },

    setLocation: function(url) {
      document.location = url;
    }

  }, events);

  remoteStorage.widget.setView(widgetView);

  /**
   * Class: WidgetRemotestorage
   */
  return WidgetModal.extend({
    el: '#widgetModal',

    template: widgetRemotestorageTemplate,

    events: {
      'submit #connect-form': 'connectStorage',
      'click *[data-command="sync"]': 'syncCommand',
      'click *[data-command="disconnect"]': 'disconnectCommand',
    },

    initialize: function() {
      remoteStorage.claimAccess('locations', 'rw').
        then(function() {
          remoteStorage.displayWidget();
        });

      widgetView.on('state', _.bind(this.refresh, this));
    },

    connectStorage: function(event) {
      event.preventDefault();
      widgetView.emit('connect', event.target.userAddress.value);
      return false;
    },

    syncCommand: function() {
      widgetView.emit('sync');
    },

    disconnectCommand: function() {
      widgetView.emit('disconnect');
    },

    refresh: function() {
      var state = widgetView.state;
      this.$el.html(this.template({
        state: state,
        showForm: (state === 'initial' || state === 'typing'),
        showSync: (state === 'connected'),
        showDisconnect: (state === 'connected' || state === 'busy')
      }));
    }
  });
});
