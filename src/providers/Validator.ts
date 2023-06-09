import {ValidationError, Validator as SchemaValidator} from 'jsonschema'

export class Validator {
  private readonly options: object
  private readonly schemaValidator: SchemaValidator

  public constructor(options: object) {
    this.options = options
    this.schemaValidator = new SchemaValidator()
    this.setCustomFormats()
  }

  public validate(body, schema) {
    return this.schemaValidator.validate(body, schema, this.getOptions())
  }

  public getFieldErrors(errors: ValidationError[]) {
    const errorsArr = errors.map((error: ValidationError) => {
      const buildFieldName = () => {
        if (error.property === 'instance') return error.property

        return error.property.replace('instance.', '')
      }

      return {[buildFieldName()]: error.message}
    })

    return Object.assign({}, ...errorsArr)
  }

  private getOptions() {
    return {
      ...{required: true},
      ...this.options
    }
  }

  private setCustomFormats(){
    this.schemaValidator.customFormats.phoneNumber = this.setFormatPhoneNumber
    this.schemaValidator.customFormats.name = this.setFormatName
    this.schemaValidator.customFormats.password = this.setFormatPassword
  }

  private setFormatPhoneNumber = (input: string): boolean => {
    return !!input.match(/^\+?\d+(?:[ ]?\d+)*$/)
  }

  private setFormatName = (input: string): boolean => {
    return !!input.match(/(\w.+\s).+/)
  }
  /**
   * ^            Start anchor
   * (?=.*[A-Z])  Ensure string has at least one uppercase letters.
   * (?=.*[0-9])  Ensure string has at least one digit.
   * (?=.*[a-z])  Ensure string has at least one lowercase letters.
   * .{8,}        Ensure string has minimum of length 8.
   * $            End anchor.
   */
  private setFormatPassword = (input: string): boolean => {
    return !!input.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/)
  }
}

export default Validator
