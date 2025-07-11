const addProductValidator = {
    title: {
        notEmpty: {
            errorMessage: 'title should not be empty',
        },
        isString: {
            errorMessage: 'title should be a string',
        },
    },
    description: {
        notEmpty: {
            errorMessage: 'description should not be empty',
        },
        isString: {
            errorMessage: 'description should be a string',
        },
        isLength: {
            options: {
                min: 10,
            },
            errorMessage: 'description should have at least 10 characters',
        },
    },
    category: {
        notEmpty: {
            errorMessage: 'category should not be empty',
        },
        isString: {
            errorMessage: 'category should be a string',
        },
    },
};

export { addProductValidator };
