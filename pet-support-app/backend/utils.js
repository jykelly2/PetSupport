const roles = 
    {
         Administrator: 'Administrator',
         Staff: 'Staff',
         ScheduleManager: 'Schedule Manager',
         AnimalManager: 'Animal Manager'
    }

const bookingStatus = {
    Reviewing: 'Reviewing',
    Approved: 'Approved',
    InProgress: 'In Progress',
    Completed: 'Completed',
    Cancelled: 'Cancelled'
}

const bucketType = {
    Animal: 'Animal',
    Shelter: 'Shelter',
    Staff: 'Staff' 
}

const convertUTCDateToLocalDate = (date)  => {
    var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return newDate;   
}

module.exports = {
    roles,
    bookingStatus,
    bucketType,
    convertUTCDateToLocalDate
}
