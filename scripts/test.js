function getTimeString(timeInSeconds) {
    const hour = parseInt(timeInSeconds / 3600);
    const remainingSeconds = timeInSeconds % 3600;
    const minutes = parseInt(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${hour} hour ${minutes} minutes and ${seconds} seconds ago`
}

console.log(getTimeString(7865));