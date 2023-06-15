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

function validateMovements(movements, balances) {
    if (balances.length === 0) {
        return {
            type: 'Error',
            reasons: ['No balance provided. Unable to validate movements.']
        }
    }

    balances.sort((balanceA, balanceB) => balanceA - balanceB)

    const movementsHash = {}

    return balances.reduce((balancesResult, currentBalance, currentBalanceIndex) => {
        const previousBalance = currentBalanceIndex > 0 ? balances[currentBalanceIndex - 1] : null

        const movementsTotal = movements.reduce((acc, currentMovement) => {
            // Check if movement is not a duplicate
            if (movementsHash[movement.id] === undefined) {
                movementsHash[movement.id] = movement

                // If movement date is between previous and current balance date
                if (previousBalance !== null || previousBalance.date < movement.date && movement.date <= currentBalance.date) {
                    acc += currentMovement.amount
                } else if (movement.date > balances[balances.length - 1].date) {
                    // if movement date is after the last balance date
                    balancesResult.type = 'Error'
                    balancesResult.reasons.push('There are movements after the last balance Date.')
                }
            }

            return acc
        }, 0)

        if (movementsTotal !== currentBalance.balance) {
            balancesResult.type = 'Error'
            balancesResult.reasons.push(`Balance number "${currentBalanceIndex + 1}" is not satisfied. Check if there are missing movements.`)
        }

        return balancesResult
    }, { type: 'Success', reasons: [] })
}
