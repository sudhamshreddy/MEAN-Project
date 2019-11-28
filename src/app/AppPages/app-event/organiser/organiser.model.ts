export class Organiser
{   
    public id:number;
    public name: string;
    public description: string;
    public imagePath : string;
    public websiteLink : string;
    public location : string;
    public minimumbudget :  number;
    public events : string[];
    public size : number;
    public email : string;
    public rating ?:number;
    constructor(
                id:number,
                name:string,
                description:string,
                imagePath : string,
                website : string,
                location : string,
                minimumbudget :  number,
                events : string[] ,
                size:number,
                email:string,
                rating?:number
                 )
    {  
        this.id = id;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.websiteLink = website;
        this.location = location;
        this.minimumbudget = minimumbudget;
        this.events = events;
        this.size = size;
        this.email = email;
        this.rating = rating;
    }

}