import Ajv from "ajv"

const ajv = new Ajv()

const schema = {
  type: "object",
  properties: {
    movements: {
        type: "array",
        items: {
            type: "object",
            properties: {
                id: {  type: 'integer' },
                date: {  type: 'integer' },
                label: {  type: 'string' },
                amount: {  type: 'number' },
            },
            required: ["id", "date", "amount"],
            additionalProperties: false,
        },
    },
    balances: {
        type: "array",
        items: {
            type: "object",
            properties: {
                date: {  type: 'integer' },
                balance: {  type: 'number' },
            },
            required: ["date", "balance"],
            additionalProperties: false,
        },
    },
  },
  required: ["movements", "balances"],
  additionalProperties: false,
}

export const validateBody = ajv.compile(schema)
