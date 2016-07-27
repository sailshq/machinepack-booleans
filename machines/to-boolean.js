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
    },

    strict: {
      friendlyName: 'Strict?',
      description: 'Whether to restrict the set of values that can be converted.',
      extendedDescription: 'If `true`, only existing booleans, the strings "0", "1", "true", "false" and "" and the numbers 0 and 1 will be converted.  Any other values will trigger the \'Not a boolean\' exit.  If \'Strict?\' is `false` (the default), any "truthy" value will be converted to `true`, and all other values will be converted to `false`.',
      example: true,
      defaultsTo: false
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'boolean',
      outputDescription: 'The value obtained by converting the input value to a boolean.',
      outputExample: true
    },

    couldNotConvert: {
      friendlyName: 'Not a boolean',
      description: 'The input value could not be converted to a boolean.'
    }

  },


  fn: function(inputs, exits) {

    // If it's already a boolean, just return the value through the `success` exit.
    if (typeof inputs.value === 'boolean') {
      return exits.success(inputs.value);
    }

    // In strict mode, only strings and numbers can be converted to booleans.
    if (inputs.strict && typeof inputs.value !== 'string' && typeof inputs.value !== 'number') {
      return exits.couldNotConvert();
    }

    // Try to convert strings, but only if they are literally the words `true` or `false`
    // or the numerals `1` or `0` or the empty string.
    if (typeof inputs.value === 'string') {
      if (inputs.value === 'true' || inputs.value === '1') {
        return exits.success(true);
      }
      if (inputs.value === 'false' || inputs.value === '0' || inputs.value === '') {
        return exits.success(false);
      }
      // Otherwise, if in strict mode declare the value unconvertible.
      if (inputs.strict) {
        return exits.couldNotConvert();
      }
    }

    // If the value is the number 1, return true.
    if (inputs.value === 1) {return exits.success(true);}

    // If the value is the number 0, return false.
    if (inputs.value === 0) {return exits.success(false);}

    // If we're in strict mode, give up.
    if (inputs.strict) {
      return exits.couldNotConvert();
    }

    // Otherwise if the value is null or undefined, return `false`.
    if (typeof inputs.value === 'undefined' || inputs.value === null) {
      return exits.success(false);
    }

    // Otherwise return `true`.
    return exits.success(true);

  },



};
