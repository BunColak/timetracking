import React from "react";
import {TableCell, TableRow} from "~/components/ui/table";
import {format, formatDistanceStrict} from "date-fns";
import {Timelog} from "~/schemas";
import {Jsonify} from "type-fest";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import {useFetcher} from "@remix-run/react";

type TimelogItemProps = {
    item: Jsonify<Timelog>;
};

export const TimelogItem: React.FC<TimelogItemProps> = ({item}) => {
    const [showDelete, setShowDelete] = React.useState(false);
    const date = new Date(item.date);
    const startTime = new Date(item.startTime);
    const endTime = new Date(item.endTime);
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
            {fetcher.state === 'idle' ? <TableRow className="bg-gray-100" onClick={() => setShowDelete(true)}>
                <TableCell>{format(date, "EEEE - dd/MM")}</TableCell>
                <TableCell>
                    {format(startTime, "HH:mm")} - {format(endTime, "HH:mm")}
                </TableCell>
                <TableCell align="right">{formatDistanceStrict(startTime, endTime)}</TableCell>
            </TableRow> : null}
        </>
    );
};
