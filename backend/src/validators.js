const Joi = require('joi');
const translationValidator = Joi.object({
    userId: Joi.string().min(1).required().messages({
        'string.empty': 'Text is required',
        'string.min': 'Text must be at least 1 character long',
    }),
    text: Joi.string().min(1).required().messages({
        'string.empty': 'Text is required',
        'string.min': 'Text must be at least 1 character long',
    }),
    sourceLanguage: Joi.string().required().messages({
        'string.empty': 'Source language is required',
        'string.length': 'Source language code should be exactly 2 characters long',
    }),
    targetLanguage: Joi.string().required().messages({
        'string.empty': 'Target language is required',
        'string.length': 'Target language code should be exactly 2 characters long',
    }),
});



const validateTranslationRequest = (req, res, next) => {
    const { error } = translationValidator.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next();
};

const schema = Joi.object({
    userId: Joi.string().required().messages({
        'string.empty': 'userId is required',
        'any.required': 'userId is required',
    }),
    from: Joi.string().required().messages({
        'string.empty': 'from is required',
        'any.required': 'from is required',
    }),
    to: Joi.string().required().messages({
        'string.empty': 'to is required',
        'any.required': 'to is required',
    }),
});

const validateHistoryRequest = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    next();
};


const paginationSchema = Joi.object({
    userid: Joi.string().required(),
    page: Joi.number().integer().min(1).default(1).messages({
        'number.base': 'Page must be a number',
        'number.integer': 'Page must be an integer',
        'number.min': 'Page must be at least 1',
    }),
    limit: Joi.number().integer().min(1).default(10).messages({
        'number.base': 'Limit must be a number',
        'number.integer': 'Limit must be an integer',
        'number.min': 'Limit must be at least 1',
    }),
    sort: Joi.string()
        .valid('asc', 'desc', 'name', 'date', 'relevance') // Add your custom sort fields here
        .optional()
        .default('asc') // Default to ascending if not provided
        .messages({
            'string.base': 'Sort must be a string',
            'any.only': 'Sort must be one of [asc, desc, name, date, relevance]',
        }),
});

// Middleware to validate req.query
const validatePagination = (req, res, next) => {
    const { error, value } = paginationSchema.validate(req.query);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    // Replace req.query with the validated and defaulted values
    req.query = value;

    next();
};

module.exports = { validateTranslationRequest, validateHistoryRequest, validatePagination }