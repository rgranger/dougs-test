import { validateMovements } from "../../../lib/movements/validate-movements"

export function handleRequest(req, res) {
    const parseResult = parseInputs(req.body)

    if (parseResult.type === 'Error') {
        res.status(400).json({ error: 'Invalid payload' })
    } else if (parseResult.type === 'Success') {
        const { movements, balances } = parseResult.data
        
        const validationResult = validateMovements(movements, balances)

        if (validationResult.type === 'Error') {
            res.status(418).json({ message: "I'm a teapot", reasons: [] })
        } else if (validationResult.type === 'Success') {
            res.status(202).json({ message: 'Accepted' })
        }
    }

    res.status(500).json({ error: 'Should not be here' })
}

function parseInputs(body) {
    // TODO parse and validate user data
    console.log('body', body)

    return {
        type: 'Success',
        data: {
            movements: body.movements,
            balances: body.balances,
        }
    }
}
