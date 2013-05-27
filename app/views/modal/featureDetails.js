define([
  'underscore',
  'ender',
  'views/modal/base',
  'hbs!templates/featureDetails',
  'hbs!templates/featureDetailsEdit'
], function(_, $, BaseModal, showTemplate, editTemplate) {


  /**
   * Class: Modal.FeatureDetails
   */
  var FeatureDetails = BaseModal.extend({

    events: {
      'click *[data-command="save"]': 'saveAction',
      'click button': 'callCommand'
    },

    initialize: function(options) {
      this.feature = options.feature;

      // actual 'data' attribute (used by BaseModal) is generated dynamically.
      this._data = {};

      switch(options.mode) {
      case 'new':
        this._data.isNew = true;
      case 'edit':
        this.template = editTemplate;
        break;
      case 'show':
      default:
        this.template = showTemplate;
      }

      this.commands = [];
      this.commandActions = {};
      for(var command in options.commands) {
        this.commands.push(_.extend({
          command: command
        }, options.commands[command]));
        this.commandActions[command] = options.commands[command].action;
      }
      this.commands[0]['class'] = 'first';
      this.commands[this.commands.length - 1]['class'] = 'last';

      this.__defineGetter__('data', function() {
        return _.extend(
          { feature: options.feature.toJSON(),
            commands: this.commands
          },
          this._data,
          options.feature.getLatLon()
        );
      });
    },

    saveAction: function() {
      var properties = {};
      this.$('#feature-form input').forEach(function(input) {
        properties[input.name] = input.value;
      });
      console.log('save', properties);
      this.feature.save({ properties: properties });
    },

    callCommand: function(event) {
      var commandName = $(event.target).attr('data-command');
      if(commandName && this.commandActions[commandName]) {
        this.commandActions[commandName](this.options.feature);
      }
    }

  });

  return FeatureDetails;

});
