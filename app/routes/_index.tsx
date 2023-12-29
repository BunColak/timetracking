import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "~/components/ui/table";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/remix";
import { db } from "~/lib/db.server";
import { useLoaderData } from "@remix-run/react";
import {
  eachWeekOfInterval,
  endOfMonth,
  format,
  getWeek,
  millisecondsToHours,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { getUserIdOrRedirect } from "~/lib/auth";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import { Timelog, timelogs } from "~/schemas";
import { TimelogItem } from "~/components/TimelogItem";
import { TimelogWeekSummary } from "~/components/TimelogWeekSummary";

export const meta: MetaFunction = () => {
  return [
    { title: "Timetracking" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const data = {
  WEEK_START_DATE: ["item", "item2"],
  WEEK_START_DATE2: [],
};

export const loader = async (args: LoaderFunctionArgs) => {
  const userId = await getUserIdOrRedirect(args);
  const currentDate = new Date();

  const startOfTheMonth = startOfMonth(currentDate);
  const endOfTheMonth = endOfMonth(currentDate);
  const weeks = eachWeekOfInterval(
    { start: startOfTheMonth, end: endOfTheMonth },
    { weekStartsOn: 1 }
  );

  const data = await db
    .select()
    .from(timelogs)
    .where(
      and(
        eq(timelogs.userId, userId),
        gte(timelogs.startTime, startOfTheMonth),
        lte(timelogs.endTime, endOfTheMonth)
      )
    )
    .orderBy(desc(timelogs.date));

  const groupedData: Record<string, Timelog[]> = {};

  weeks.forEach((week) => {
    groupedData[startOfWeek(week).toISOString()] = [];
  });

  data.forEach((item) => {
    const date = new Date(item.date);
    const week = startOfWeek(date);

    groupedData[week.toISOString()].push(item);
  });

  return json({ data: groupedData });
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();
  const currentDate = new Date();

  return (
    <div className="container mt-4">
      <SignedIn>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Timesheet</CardTitle>
              <Button size="sm">Change Month</Button>
            </div>
            <CardDescription>
              {format(currentDate, "LLLL")}: 14hrs
            </CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(data).map((week) => {
              return (
                <div>
                  <h4
                    className="scroll-m-20 text-xl font-semibold tracking-tight"
                    key={week}
                  >
                    Week {getWeek(new Date(week))}
                  </h4>
                  <Table className="mt-2 border-separate border-spacing-y-2">
                    <TableBody>
                      {data[week].map((item) => {
                        return <TimelogItem item={item} key={item.id} />;
                      })}
                    </TableBody>
                    <TableFooter className="bg-transparent">
                      <TableRow className="hover:bg-transparent">
                        <TableCell className="pl-0">
                          <Button size="sm" variant="secondary">
                            <Plus className="mr-2 h-4 w-4" /> Add Item
                          </Button>
                        </TableCell>
                        <TimelogWeekSummary weeklyData={data[week]} />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              );
            })}
            <Separator className="mt-2 my-4" />
            <div className="flex justify-between items-center">
              <Button size="sm" variant="default">
                <Plus className="mr-2 h-4 w-4" /> Add Week
              </Button>
              <small className="text-end text-sm font-bold leading-none">
                Total: 70 hrs
              </small>
            </div>
          </CardContent>
        </Card>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
