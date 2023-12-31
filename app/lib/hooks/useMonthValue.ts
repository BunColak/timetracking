import {useSearchParams} from "@remix-run/react";

export const convertSearchParamToDate = (searchParams: URLSearchParams) => {
    return searchParams.get('date') ? new Date(searchParams.get('date') as string) : new Date()
}

export const useMonthValue = () => {
    const [searchParams] = useSearchParams()
    return convertSearchParamToDate(searchParams)
}