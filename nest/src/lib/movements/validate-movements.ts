import { Movement, Balance } from "./types"

type SuccessResult = {
    type: 'Success'
    reasons: string[]
}

type ErrorResult = {
    type: 'Error'
    reasons: string[]
}

export type Result = SuccessResult | ErrorResult

export function validateMovements(movements: Movement[], balances: Balance[]): Result {
    if (balances.length === 0) {
        return {
            type: 'Error',
            reasons: ['No balance provided. Unable to validate movements.']
        }
    }

    balances.sort((balanceA, balanceB) => balanceA.date - balanceB.date)

    return balances.reduce((balancesResult, currentBalance, currentBalanceIndex) => {
        const previousBalance = currentBalanceIndex > 0 ? balances[currentBalanceIndex - 1] : null

        const movementsHash = {}

        const movementsTotal = movements.reduce((acc, currentMovement) => {
            // Check if movement is not a duplicate
            if (movementsHash[currentMovement.id] === undefined) {
                movementsHash[currentMovement.id] = currentMovement

                // If movement date is between previous and current balance date
                if ((previousBalance === null || previousBalance.date < currentMovement.date) &&
                    currentMovement.date <= currentBalance.date) {
                    acc += currentMovement.amount
                } else if (currentMovement.date > balances[balances.length - 1].date) {
                    // if movement date is after the last balance date
                    balancesResult.type = 'Error'
                    balancesResult.reasons.push('There are movements after the last balance Date.')
                }
            }

            return acc
        }, 0)

        if (movementsTotal !== currentBalance.balance) {
            balancesResult.type = 'Error'
            balancesResult.reasons.push(`Balance with Date "${currentBalance.date}" is not satisfied. Check if there are missing movements.`)
        }

        return balancesResult
    }, { type: 'Success', reasons: [] } as Result)
}
