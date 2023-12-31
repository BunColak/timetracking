import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import React, {useRef, useState} from "react";
import {Button} from "~/components/ui/button";
import {CalendarIcon} from "lucide-react";
import {format, formatISO} from "date-fns";
import {Calendar} from "~/components/ui/calendar";
import {cn} from "~/lib/utils";
import {SelectSingleEventHandler} from "react-day-picker";

type DatePickerProps = {
    defaultValue: Date
    name?: string
}

export const DatePicker: React.FC<DatePickerProps> = ({defaultValue, name}) => {
    const [date, setDate] = useState<Date>(defaultValue)
    const [open, setOpen] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>(format(defaultValue, 'yyyy-MM-dd'))

    const handleDaySelect: SelectSingleEventHandler = (date) => {
        if (date) {
            setDate(date);
            setInputValue(format(date, 'yyyy-MM-dd'))
            setOpen(false);
        }
    }

    return <div>
        <input name={name || 'date'} hidden value={inputValue}/>
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDaySelect}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    </div>
}