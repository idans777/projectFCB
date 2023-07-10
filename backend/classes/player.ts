class Player {
    public id: number = 0;
    public name: string = "";
    public number: number = 0;
    public position: string = "";
    public image: string = "";

    constructor(
        name: string,
        number: number,
        position: string,
        image: string,
        id?: number,
        ) {
        this.name = name
        this.number = number
        this.position = position
        this.image = image
        if(id){
            this.id = id
        }
        else {
            this.id = 0
        }
    }
}

export default Player;