
export function addTimeProperties(eventsArray) {
    eventsArray.forEach((event) => {
        
        const startDate = new Date(event.startDate);
        const startTime = startDate.toLocaleTimeString('en-US', {
            hour: 'numeric', // Use '2-digit' for "08" or 'numeric' for "8"
            minute: '2-digit',
            hour12: true 
        });

        const endDate = new Date(event.endDate);
        const endTime = endDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        const day = startDate.toLocaleDateString('en-US', { day: 'numeric' });
        const month = startDate.toLocaleDateString('en-US', { month: 'long' });
        const year = startDate.toLocaleDateString('en-US', { year: 'numeric' });

        event.startTime = startTime;
        event.endTime = endTime;
        event.day = day;
        event.month = month;
        event.year = year;
    });

    return eventsArray
}
