import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {Duration, interval, intervalToDuration} from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatStartEnd = (start: Date, end: Date) => {
    const duration = intervalToDuration(interval(start, end))

    return formatDuration(duration)
}

export const formatMilliseconds = (milliseconds: number) => {
    const duration = intervalToDuration({start: 0, end: milliseconds})

    return formatDuration(duration)
}

export const formatDuration = (duration: Duration) => {
    const hours = duration.hours
    const minutes = duration.minutes

    if (hours && minutes) {
        const number = hours + (minutes / 60)
        return `${number} hours`
    } else {
        if (hours) {
            return `${hours} hours`
        }
        if (minutes) {
            return `${minutes} minutes`
        }
    }
}