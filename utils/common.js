export function timeSince(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30; // Approximate number of milliseconds in a month

    const elapsed = now - past;

    if (elapsed < msPerMinute) {
        return '1分钟内';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + '分钟';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + '小时';
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + '天';
    } else if (elapsed < msPerMonth * 3) {
        return Math.round(elapsed / msPerMonth) + '月';
    } else {
        return null;
    }
}