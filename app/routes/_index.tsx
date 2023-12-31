import {json, LoaderFunctionArgs, MetaFunction} from "@remix-run/node";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "~/components/ui/card";
import {Separator} from "~/components/ui/separator";
import {Table, TableBody, TableCell, TableFooter, TableRow,} from "~/components/ui/table";
import {RedirectToSignIn, SignedIn, SignedOut} from "@clerk/remix";
import {db} from "~/lib/db.server";
import {Link, useLoaderData} from "@remix-run/react";
import {
    differenceInMilliseconds,
    eachWeekOfInterval,
    endOfMonth,
    format, formatISO,
    getWeek,
    parse,
    startOfMonth,
    startOfWeek,
} from "date-fns";
import {getUserIdOrRedirect} from "~/lib/auth";
import {and, asc, eq, gte, lte} from "drizzle-orm";
import {Timelog, timelogs} from "~/schemas";
import {TimelogItem} from "~/components/TimelogItem";
import {TimelogWeekSummary} from "~/components/TimelogWeekSummary";
import {MonthPicker} from "~/components/MonthPicker";
import {convertSearchParamToDate, useMonthValue} from "~/lib/hooks/useMonthValue";
import {NewTimelogFormButton} from "~/components/NewTimelogFormButton";
import {formatMilliseconds} from "~/lib/utils";

export const meta: MetaFunction = () => {
    return [
        {title: "Timetracking"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

const data = {
    WEEK_START_DATE: ["item", "item2"],
    WEEK_START_DATE2: [],
};

export const loader = async (args: LoaderFunctionArgs) => {
    const userId = await getUserIdOrRedirect(args);
    const url = new URL(args.request.url);
    const currentDate = convertSearchParamToDate(url.searchParams)

    const startOfTheMonth = startOfMonth(currentDate);
    const endOfTheMonth = endOfMonth(currentDate);

    const weeks = eachWeekOfInterval(
        {start: startOfTheMonth, end: endOfTheMonth},
        {weekStartsOn: 1}
    );

    const data = await db
        .select()
        .from(timelogs)
        .where(
            and(
                eq(timelogs.userId, userId),
                gte(timelogs.date, formatISO(startOfTheMonth)),
                lte(timelogs.date, formatISO(endOfTheMonth))
            )
        )
        .orderBy(asc(timelogs.date));

    const groupedData: Record<string, Timelog[]> = {};

    weeks.forEach((week) => {
        groupedData[formatISO(startOfWeek(week, {weekStartsOn: 1}))] = [];
    });

    data.forEach((item) => {
        const date = new Date(item.date);
        const week = startOfWeek(date, {weekStartsOn: 1});

        groupedData[formatISO(week)].push(item);
    });

    return json({data: groupedData});
};

export default function Index() {
    const {data} = useLoaderData<typeof loader>();
    const totalMilliseconds = Object.keys(data).reduce((accumulator, week) => {
        const totalMilliseconds = data[week].reduce(
            (accumulator, item) =>
                accumulator +
                differenceInMilliseconds(new Date(`1970-01-01T${item.endTime}`),new Date(`1970-01-01T${item.startTime}`)),
            0
        );

        return accumulator + totalMilliseconds;
    }, 0);

    const currentDate = useMonthValue()

    return (
        <div className="container mt-4">
            <SignedIn>
                <Card>
                    <CardHeader>
                        <div className="flex justify-between gap-6">
                            <CardTitle>
                                <Link to="/">Timelogs</Link>
                            </CardTitle>
                            <MonthPicker/>
                        </div>
                        <CardDescription>
                            {format(currentDate, "LLLL")}: {formatMilliseconds(totalMilliseconds)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {Object.keys(data).map((week) => {
                            return (
                                <div key={week}>
                                    <h4
                                        className="scroll-m-20 text-xl font-semibold tracking-tight"
                                    >
                                        Week {getWeek(new Date(week))}
                                    </h4>
                                    <Table className="mt-2 border-separate border-spacing-y-2">
                                        <TableBody>
                                            {data[week].map((item) => {
                                                return <TimelogItem item={item} key={item.id}/>;
                                            })}
                                        </TableBody>
                                        <TableFooter className="bg-transparent">
                                            <TableRow className="hover:bg-transparent">
                                                <TableCell className="pl-0">
                                                    <NewTimelogFormButton weekStart={new Date(week)}/>

                                                </TableCell>
                                                <TimelogWeekSummary weeklyData={data[week]}/>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </div>
                            );
                        })}
                        <Separator className="mt-2 my-4"/>
                        <div className="flex justify-end items-center">
                            <small className="text-end text-sm font-bold leading-none">
                                Total: {formatMilliseconds(totalMilliseconds)}
                            </small>
                        </div>
                    </CardContent>
                </Card>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn/>
            </SignedOut>
        </div>
    );
}
