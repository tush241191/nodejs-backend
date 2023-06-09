import validator from 'validator'

import SchemaValidator from '../providers/Validator'

class Validate {
  public static requireValidUuid (req, res, next) {
    if (!validator.isUUID(req.params.id)) {
      return res.status(400).json({error: 'Invalid ID provided'})
    }

    return next()
  }

  public static requireSchema (schema, options = {}) {
    const schemaValidator = new SchemaValidator(options)

    return (req, res, next) => {
      const {body} = req
      if (!body) {
        res.status(400).json({error: 'missing request body'})
        return
      }

      const {valid, errors, instance: validatedBody} = schemaValidator.validate(body, schema)

      if (!valid) {
        return res.status(400).json({
          ...{error: 'request body validation failed'},
          ...{fieldErrors: schemaValidator.getFieldErrors(errors)}
        })
      }

      req.body = validatedBody
      return next()
    }
  }
}

export default Validate
