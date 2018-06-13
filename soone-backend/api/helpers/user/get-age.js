module.exports = {
    friendlyName: "Get age",

    description: "Return the age of the user, calculated from his birthday",

    inputs: {
        birthDate: {
            description: 'The birthdate',
            type: 'string'
        }
    },

    exits: {
        success: {
            responseType: 'ref',
        }
    },

    fn: async function (inputs, exits) {
        var ageDifMs = Date.now() - new Date(inputs.birthDate).getTime();
        var ageDate = new Date(ageDifMs);

        return exits.success(Math.abs(ageDate.getUTCFullYear() - 1970));
    }
};