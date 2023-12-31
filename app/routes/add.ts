import {ActionFunctionArgs, json} from "@remix-run/node";
import {getUserIdOrRedirect, getUserIdOrThrow} from "~/lib/auth";
import {zfd} from "zod-form-data";
import {format, isBefore, isPast, parse, parseISO, setHours} from "date-fns";
import {db} from "~/lib/db.server";
import {timelogs} from "~/schemas";

const schema = zfd.formData({
    date: zfd.text(),
    startTime: zfd.text(),
    endTime: zfd.text(),
})

export const action = async (args: ActionFunctionArgs) => {
    const userId = await getUserIdOrThrow(args)
    const formData = await args.request.formData();

    const data = schema.parse(formData)

    const validatedDate = parse(data.date, 'yyyy-MM-dd', new Date())
    const validatedStartTime = parse(data.startTime, 'HH:mm', validatedDate)
    const validatedEndTime = parse(data.endTime, 'HH:mm', validatedDate)

    if (isBefore(validatedEndTime, validatedStartTime)) {
        return json({startTime: 'Start time must be before end time.'}, {status: 400})
    }

    await db.insert(timelogs).values({
        startTime: validatedStartTime,
        endTime: validatedEndTime,
        userId: userId,
        date: format(validatedDate, 'yyyy-MM-dd'),
    })

    return json({message: 'Success.'})
}