import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {differenceInMilliseconds} from "date-fns";
import humanize from "humanize-duration";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatStartEnd = (start: Date, end: Date) => {
    const duration = differenceInMilliseconds(end, start)

    return formatMilliseconds(duration)
}

export const formatMilliseconds = (milliseconds: number) => {
    return humanize(milliseconds, {units: ['h', 'm']})
}