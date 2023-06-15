export function handleRequest(req, res) {
    const result = parseInputs(req.body)

    if (result.type === 'Error') {
        res.status(400).json({ error: 'Invalid payload' })
    } else if (result.type === 'Success') {
        const { movements, balances } = result.data
        
        res.send('Hello World')
    }
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
