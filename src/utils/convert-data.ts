export function convertDurationToStimeString(duration: number): string {
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    const seconds = duration % 60

    const timeString = [hours, minutes, seconds]
     .map(value => String(value).padStart(2, '0'))
     .join(':')

    return  timeString
}

export function convertDateString(dateString: string): string {
    const date = new Date(dateString)
    const dateResult = [
        String(date.getDate()).padStart(2, '0'),
        String(date.getMonth() + 1),
        String(date.getFullYear())
    ]
     .join('/')

    return dateResult
}