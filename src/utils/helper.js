export function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function toDateTime(timestamp) {
    const x = new Date(timestamp)
    return `${x.toLocaleDateString()} ${x.toLocaleTimeString()}`
}