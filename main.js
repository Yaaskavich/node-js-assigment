function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let totalWorkingDays = 0; 
    let daysExcludingFridays = [];
    let daysWorkedExcludingFridays = [];
    let monthlyTargets = [];

    // Helper function to check if a day is Friday
    function isFriday(date) {
        return date.getDay() === 5; // 5 is Friday
    }

    // Loop through months
    for (let current = new Date(start.getFullYear(), start.getMonth(), 1); 
         current <= end; 
         current.setMonth(current.getMonth() + 1)) {

        let monthStart = new Date(Math.max(current, start)); // start of the month or startDate
        let monthEnd = new Date(Math.min(new Date(current.getFullYear(), current.getMonth() + 1, 0), end)); // end of the month or endDate

        let nonFridayDays = 0;
        let workingDays = 0;

        // Loop through each day of the month
        for (let day = new Date(monthStart); day <= monthEnd; day.setDate(day.getDate() + 1)) {
            if (!isFriday(day)) {
                nonFridayDays++;
                workingDays++;
            }
        }

        daysExcludingFridays.push(nonFridayDays);
        daysWorkedExcludingFridays.push(workingDays);
        totalWorkingDays += workingDays;
    }

    // Proportionally distribute the annual target based on valid working days
    for (let i = 0; i < daysWorkedExcludingFridays.length; i++) {
        let monthlyTarget = (totalAnnualTarget * daysWorkedExcludingFridays[i]) / totalWorkingDays;
        monthlyTargets.push(monthlyTarget);
    }

    let totalTarget = monthlyTargets.reduce((sum, val) => sum + val, 0);

    return {
        daysExcludingFridays,
        daysWorkedExcludingFridays,
        monthlyTargets,
        totalTarget
    };
}

// Example usage:
console.log(calculateTotalTarget('2024-01-01', '2024-03-31', 5220));