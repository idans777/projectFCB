import User from "./classes/user";
import mysql_interface from "./mysql_interface";
import queries from "./queries";
import { sign, verify } from './jwt';
import Game from "./classes/game";
import Player from "./classes/player";



const register = async (user: User): Promise<number> => {
    if(user.user_name == "admin") {
        console.log("user name not allowed");
        return -1
    }
    const check = await mysql_interface.execute(`SELECT EXISTS(SELECT * FROM user WHERE user_name='${user.user_name}')as user_count`);
    if(check[0].user_count == 0 ) {
        const result = await queries.add_user(user)
        return result.insertId
    }
    else {
        console.log("user name already exists");
        return 0
    }
}

/*
    Login
    Return token on success
    Return null on failure
*/
const login = async (user_name:string, password:string):Promise<any> => {
    if(user_name == "admin" && password == "admin") {
        const user = new User("admin", "admin", "admin","admin")
        const token = await sign(user)
        return token
    }
    const result = await queries.signin(user_name, password);
    if(result && result.length !== 0) {
        console.log(`${user_name} logged in`);
        const user = new User(result[0].first_name, result[0].last_name, result[0].user_name, result[0].password, result[0].id)
        const token = await sign(user)
        return token
    }
    else
        console.log("user name or password is incorrect");
        return null
}


/* Add delete and update game */    
const add_game = async (game: Game):Promise<boolean> => {
    const result = await queries.add_game(game);
    if(result) {
        console.log('Vacation added')
        return true
    }
    console.log('Vacation not added')
    return false
}

const delete_game = async (game_id: number) => {
    const result = await queries.delete_game(game_id);
    if(result) {
        console.log("game deleted");
        return true;    
    }
    console.log("game not deleted");
    return false;
}


const update_game = async (game: Game) => {
    const result = await queries.update_game(game);
    if(result) {
        console.log("game updated");
        return true;    
    }
    console.log("game not updated");
    return false;
}

const add_player = async (player: Player) => {
    const result = await queries.add_player(player);
    if(result) {
        console.log("player added");
        return true;
    }
    console.log("player didnt added");
    return false;
}

const delete_player = async (player_id: number) => {
    const result = await queries.delete_player(player_id);
    if(result) {
        console.log("player deleted");
        return true;
    }
    console.log("player didnt deleted");
    return false;
}

const update_player = async (player: Player) => {
    const result = await queries.update_player(player);
    if(result) {
        console.log("player updated");
        return true;
    }
    console.log("player didnt updated");
    return false;
}


export {
    register,
    login,
    add_game,
    delete_game,
    update_game,
    add_player,
    delete_player,
    update_player,

}