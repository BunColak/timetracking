import {ActionFunctionArgs, json} from "@remix-run/node";
import {getUserIdOrThrow} from "~/lib/auth";
import {db} from "~/lib/db.server";
import {timelogs} from "~/schemas";
import {and, eq} from "drizzle-orm";

export const action = async (args: ActionFunctionArgs) => {
    const userId = await getUserIdOrThrow(args)
    const formData = await args.request.formData()
    const id = Number(formData.get('id'))

    if (!id) {
        throw json({message: 'Missing id'}, {status: 400})
    }

    const item = await db.select().from(timelogs).where(and(eq(timelogs.id, id), eq(timelogs.userId, userId))).limit(1)

    if (!item) {
        throw json({message: 'Not found'}, {status: 404})
    }

    await db.delete(timelogs).where(and(eq(timelogs.id, id), eq(timelogs.userId, userId)))

    return json({message: 'Deleted'})
}