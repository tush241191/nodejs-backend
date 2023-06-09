export default {
  type: 'object',
  required: [
    'deviceId',
    'quantity'
  ],
  additionalProperties: false,
  properties: {
    deviceId: {type: 'string'},
    quantity: {type: 'number'}
  }
}