class Game {
    public id: number = 0;
    public opponent: string = "";
    public location: string = "";
    public date: Date;
    public time: any;
    public tournament: string = "";

    constructor(
        opponent: string,
        location: string,
        date: Date,
        time: any,
        tournament: string,
        id?: number,
        ) {
        this.opponent = opponent
        this.location = location
        this.date = date
        this.time = date.toLocaleTimeString();
        this.tournament = tournament
        if(id){
            this.id = id
        }
        else {
            this.id = 0
        }
    }
}

export default Game;