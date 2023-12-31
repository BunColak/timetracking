import React from "react";
import {parse} from "date-fns";
import {TableCell} from "~/components/ui/table";
import {Timelog} from "~/schemas";
import {JsonifyObject} from "type-fest/source/jsonify";
import {formatMilliseconds} from "~/lib/utils";

type TimelogWeekSummaryProps = {
    weeklyData: JsonifyObject<Timelog>[];
};

const getDifferenceInMilliseconds = (startTime: Date, endTime: Date) => {
    return endTime.getTime() - startTime.getTime();
};

export const TimelogWeekSummary: React.FC<TimelogWeekSummaryProps> = ({
                                                                          weeklyData,
                                                                      }) => {
    const totalMilliseconds = weeklyData.reduce(
        (accumulator, item) =>
            accumulator +
            getDifferenceInMilliseconds(
                new Date(`1970-01-01T${item.startTime}`),
                new Date(`1970-01-01T${item.endTime}`)
            ),
        0
    );

    return (
        <TableCell colSpan={2} className="text-end text-secondary-foreground">
            <span>{formatMilliseconds(totalMilliseconds)} </span>
        </TableCell>
    );
};
