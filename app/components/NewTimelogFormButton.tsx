import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "~/components/ui/dialog";
import React, {useEffect} from "react";
import {Button} from "~/components/ui/button";
import {Plus} from "lucide-react";
import {Label} from "~/components/ui/label";
import {Input} from "~/components/ui/input";
import {Calendar} from "~/components/ui/calendar";
import {DatePicker} from "~/components/DatePicker";
import {Form, useFetcher} from "@remix-run/react";
import {cn} from "~/lib/utils";

type NewTimelogFormButtonProps = {
    weekStart: Date
}

export const NewTimelogFormButton: React.FC<NewTimelogFormButtonProps> = ({weekStart}) => {
    const fetcher = useFetcher<{ startTime?: string; message?: string }>()
    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        if (fetcher.data?.message === 'Success.') {
            setOpen(false)
        }
    }, [fetcher.data?.message])

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button size="sm" variant="secondary">
                <Plus className="mr-2 h-4 w-4"/> Add Item
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add new timelog</DialogTitle>
            </DialogHeader>
            <div>
                <fetcher.Form className='space-y-4' action='/add' method='post'>
                    <div className='space-y-2'>
                        <Label htmlFor="date">Date</Label>
                        <DatePicker defaultValue={weekStart} name='date'/>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input type='time' name='startTime' id='endTime' required/>
                        <p className={cn("text-[0.8rem] text-destructive hidden", {'block': fetcher.data?.startTime})}>
                            {fetcher.data?.startTime}
                        </p>
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor="endTime">End Time</Label>
                        <Input type='time' name='endTime' id='endTime' required/>
                    </div>
                    <Button type='submit' className='w-full' disabled={fetcher.state === 'submitting'}>
                        Save
                    </Button>
                </fetcher.Form>
            </div>
        </DialogContent>
    </Dialog>
}