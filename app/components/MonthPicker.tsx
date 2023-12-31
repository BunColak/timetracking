import React from "react";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Popover, PopoverContent} from "./ui/popover";
import {PopoverTrigger} from "~/components/ui/popover";
import {Button} from "~/components/ui/button";
import {Calendar} from "~/components/ui/calendar";
import {useSearchParams} from "@remix-run/react";
import {useMonthValue} from "~/lib/hooks/useMonthValue";


export const MonthPicker = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const date = useMonthValue()

    const onDateChange = (newDate: Date | undefined) => {
        if (!newDate) {
            return
        }
        searchParams.set('date', format(newDate, 'yyyy-MM-dd'))
        setSearchParams(searchParams)
    }

    return <Popover>
        <PopoverTrigger asChild>
            <Button
                size='sm'
            >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "LLLL") : <span>Change Month</span>}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
            <Calendar
                mode="single"
                selected={date}
                onSelect={onDateChange}
                initialFocus
            />
        </PopoverContent>
    </Popover>
}
