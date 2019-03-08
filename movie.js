class Movie {
    constructor(id,title, description , year){
        this.id = id;
        this.title = title;
        this.description = description;
        this.year = year;
    }
    toJson(){
        return {
            id:this.id,
            title:this.title,
            description:this.description,
            year:this.year
        };
    }
}
module.exports = Movie