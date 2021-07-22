export const roles = 
    {
         Administrator: 'Administrator',
         Staff: 'Staff',
         ScheduleManager: 'Schedule Manager',
         AnimalManager: 'Animal Manager'
    }

export const animalTypes = 
{
     Dogs: 'Dog',
     Cats: 'Cat',
     Birds: 'Bird',
     Rabbits: 'Rabbit',
}

export const dogBreeds = {
     Akita: 'Akita',
     AmericanBulldog: 'American Bulldog',
     Beagle: 'Beagle',
     BostonTerrier: 'Boston Terrier',
     CaneCorso: 'Cane Corso',
     Dalmatian: 'Dalmatian',
     FrenchBulldog: 'French Bulldog',
     GermanShepherd: 'German Shepherd',
     Husky: 'Husky',
     LabradorRetriver: 'Labrador Retriver',
     PitBullTerrier: 'Pit Bull Terrier',
     Samoyed: 'Samoyed',
     Shiba: 'Shiba',
     ShihTzu:'Shih Tzu',
}

export const personalityTraits = [
     {value:'Active', label:'Active'},
     {value:'Calm', label:'Calm'},
     {value:'Energetic',label:'Enegetic'},
     {value:'Friendly', label:'Friendly'},
     {value:'Loud', label:'Loud'},
     {value:'Playful', label:'Playful'},
     {value:'Shy',label:'Shy'},
]

export const sizes = {
     Small: 'Small (0-25 ibs)', 
     Medium: 'Medium (26-60 ibs)', 
     Large: 'Large( 61-100 lbs)', 
     ExtraLarge: 'Extra Large (101 lbs or more)'

}

export const pageSize = [
     {value:10, label:'10'},
     {value:2, label:'2'},
     {value:50,label:'50'},
     {value:100,label:'100'},
]

export const bookingStatus = {
    Reviewing: 'Reviewing',
    Approved: 'Approved',
    InProgress: 'In Progress',
    Completed: 'Completed',
    Canceled: 'Cancelled'
}

export const bucketType = {
     Animal: 'Animal',
     Shelter: 'Shelter',
     Staff: 'Staff' 
 }

 export const linkType = {
     Animal: 'Animal',
     Shelter: 'Shelter',
     Staff: 'Staff', 
     Booking: 'Booking'
 }

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const charRegExp = /^[aA-zZ\s]+$/

export const adjustForUTCOffset = date => {
     return new Date(
       date.getUTCFullYear(),
       date.getUTCMonth(),
       date.getUTCDate(),
       date.getUTCHours(),
       date.getUTCMinutes(),
       date.getUTCSeconds(),
     );
   };

export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];