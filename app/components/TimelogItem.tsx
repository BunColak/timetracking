import React from "react";
import { TableCell, TableRow } from "~/components/ui/table";
import { format, formatDistanceStrict } from "date-fns";
import { Timelog } from "~/schemas";
import { Jsonify } from "type-fest";

type TimelogItemProps = {
  item: Jsonify<Timelog>;
};

export const TimelogItem: React.FC<TimelogItemProps> = ({ item }) => {
  const date = new Date(item.date);
  const startTime = new Date(item.startTime);
  const endTime = new Date(item.endTime);

  return (
    <TableRow className="bg-gray-100" key={item.id}>
      <TableCell>{format(date, "EEEE - dd/MM")}</TableCell>
      <TableCell>
        {format(startTime, "HH:mm")} - {format(endTime, "HH:mm")}
      </TableCell>
      <TableCell align="right">{formatDistanceStrict(startTime, endTime)}</TableCell>
    </TableRow>
  );
};
