import formatDistance from "date-fns/formatDistance"
import ru from 'date-fns/locale/ru'

export const formatTime = (createdTime: string): string => {
    // format
    return formatDistance(Date.parse(createdTime), new Date(), { addSuffix: true, locale: ru })
};