module.exports = {


  friendlyName: 'Convert to boolean',


  description: 'Convert the given input value to a boolean.',


  extendedDescription: 'If the value cannot be converted to a boolean, the `Not a boolean` exit will be triggered.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    value: {
      description: 'The value to convert to a boolean.',
      example: '==='
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Boolean',
      outputDescription: 'The value obtained by converting the input value to a boolean.',
      outputExample: true
    }

  },


  fn: function(inputs, exits) {

    // Return the "truthiness" of the value through the `success` exit.
    return exits.success(!!inputs.value);

  },



};
