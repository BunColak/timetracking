import React from "react";
import { millisecondsToHours } from "date-fns";
import { TableCell } from "~/components/ui/table";
import { Timelog } from "~/schemas";
import { JsonifyObject } from "type-fest/source/jsonify";

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
        new Date(item.startTime),
        new Date(item.endTime)
      ),
    0
  );

  return (
    <TableCell colSpan={2} className="text-end text-secondary-foreground">
      <span>{millisecondsToHours(totalMilliseconds)} hours</span>
    </TableCell>
  );
};
