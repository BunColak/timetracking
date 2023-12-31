import React from "react";
import {TableCell, TableRow} from "~/components/ui/table";
import {format, formatDistanceStrict, parse} from "date-fns";
import {Timelog} from "~/schemas";
import {Jsonify} from "type-fest";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "~/components/ui/alert-dialog"
import {useFetcher} from "@remix-run/react";

type TimelogItemProps = {
    item: Jsonify<Timelog>;
};

export const TimelogItem: React.FC<TimelogItemProps> = ({item}) => {
    const [showDelete, setShowDelete] = React.useState(false);
    const date = new Date(item.date);
    const startTime = parse(item.startTime, 'kk:mm', date)
    const endTime = parse(item.endTime, 'kk:mm', date)
    const fetcher = useFetcher()

    const handleDelete = () => {
        fetcher.submit({id: item.id}, {method: 'post', action: '/delete'})
        setShowDelete(false)
    };

    return (
        <>
            <fetcher.Form action='/delete' method='post'>
                <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete item?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </fetcher.Form>
            {fetcher.state === 'idle' ? <TableRow className="bg-accent text-accent-foreground" onClick={() => setShowDelete(true)}>
                <TableCell>{format(date, "EEEE - dd/MM")}</TableCell>
                <TableCell>
                    {format(startTime, "HH:mm")} - {format(endTime, "HH:mm")}
                </TableCell>
                <TableCell align="right">{formatDistanceStrict(startTime, endTime)}</TableCell>
            </TableRow> : null}
        </>
    );
};
