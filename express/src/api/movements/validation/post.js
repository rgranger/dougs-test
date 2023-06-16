import { validateBody } from './validation-schema.js'
import { validateMovements } from '../../../lib/movements/validate-movements.js'

export function handleRequest(req, res) {
    if (!validateBody(req.body)) {
        res.status(400).json({ error: 'Invalid payload', reasons: validateBody.errors })
    } else {
        const { movements, balances } = req.body
        
        const result = validateMovements(movements, balances)

        if (result.type === 'Error') {
            res.status(418).json({ message: "I'm a teapot", reasons: result.reasons })
        } else if (result.type === 'Success') {
            res.status(202).json({ message: 'Accepted' })
        }
    }
}
