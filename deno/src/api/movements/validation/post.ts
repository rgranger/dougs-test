import { Context } from "https://deno.land/x/oak/mod.ts";
import { validateBody } from './validation-schema.ts'
import { validateMovements } from '../../../lib/movements/validate-movements.ts'
import { Balance, Movement } from "../../../lib/movements/types.ts";

type RequestBody = {
    movements: Movement[]
    balances: Balance[]
}

export async function handleRequest(ctx: Context) {
    if (!ctx.request.hasBody) {
        ctx.response.status = 415;
        return
    }

    let body
    try {
        body = await ctx.request.body().value
    } catch (e) {
        ctx.response.status = 400
        ctx.response.body = { message: e.message }
        return
    }


    if (!validateBody(body)) {
        ctx.response.status = 400
        ctx.response.body = { error: 'Invalid payload', reasons: validateBody.errors }
        return
    } else {
        const { movements, balances } = body as RequestBody
        
        const result = validateMovements(movements, balances)

        if (result.type === 'Error') {
            ctx.response.status = 418
            ctx.response.body = { message: "I'm a teapot", reasons: result.reasons }
            return
        } else if (result.type === 'Success') {
            ctx.response.status = 202
            ctx.response.body = { message: 'Accepted' }
            return
        }
    }
}
