import mysql_interface from "./mysql_interface";
import User from "./classes/user";
import Game from "./classes/game";
import Player from "./classes/player";

const get_squad = async (): Promise<any> => {
    try{
        const sql = `SELECT * FROM squad`;
        const result = await mysql_interface.execute(sql);
        return result;
    }
    catch(error){
        console.log(error)
    }
}

const get_games = async (): Promise<any> => {
    try{
        const sql = `SELECT * FROM games`;
        const result = await mysql_interface.execute(sql);
        return result;
    }
    catch(error){
        console.log(error);
    }
}

const get_squad_order_by_number= async (): Promise<any> => {
    try{
        const sql = `SELECT * FROM squad ORDER BY number`;
        const result = mysql_interface.execute(sql);
        return result;
    }
    catch(error){
        console.log(error);
    }
}

const get_games_order_by_date= async (): Promise<any> => {
    try{
        const sql = `SELECT * FROM games ORDER BY date`;
        const result = mysql_interface.execute(sql);
        return result;
    }
    catch(error){
        console.log(error);
    }
}

const add_user = async (user: User): Promise<any> => {
    const sql = `INSERT INTO user (first_name, last_name, user_name, password)
        VALUES ('${user.first_name}', '${user.last_name}', '${user.user_name}', '${user.password}')`
    const result = await mysql_interface.execute(sql);
    return result;
}

const signin = async (user_name:string, password:string): Promise<any> => {
    const sql = `SELECT * FROM user WHERE user_name='${user_name}' AND password='${password}'`
    const result = await mysql_interface.execute(sql);
    return result;
}


const add_game = async (game: Game): Promise<any> => {
    try {
        const sql = `INSERT INTO games (opponent, location, date, time, tournament) VALUES
            ('${game.opponent}', '${game.location}', '${game.date}', '${game.time}', '${game.tournament}')`
        const result = await mysql_interface.execute(sql);
        return result;
    }
    catch {
        return null;
    }
}


const delete_game = async (game_id: number): Promise<any> => {
    try {
            const sql = `DELETE FROM games WHERE id=${game_id}`
            return await mysql_interface.execute(sql);
        } catch (error) {
            console.log(error)
        }
}


const update_game = async (game: Game): Promise<any> => {
    try {
        const sql = `UPDATE games
            SET
                opponent='${game.opponent}',
                location='${game.location}',
                date='${game.date}',
                time='${game.time}',
                tournament='${game.tournament}',
            WHERE id=${game.id}`
        const result = await mysql_interface.execute(sql);
        return result;
    }
    catch(error) {
        console.log(error);
    }
}

const add_player = async (player: Player): Promise<any> => {
    try {
        const sql = `INSERT INTO squad (name, number, position, image) VALUES
            ('${player.name}', ${player.number}, '${player.position}', '${player.image}')`
        const result = await mysql_interface.execute(sql);
        return result;
    }
    catch {
        return null;
    }
}

const delete_player = async (player_id: number): Promise<any> => {
    try {
            const sql = `DELETE FROM squad WHERE id=${player_id}`
            return await mysql_interface.execute(sql);
        } catch (error) {
            console.log(error)
        }
}

const update_player = async (player: Player): Promise<any> => {
    try {
        const sql = `UPDATE squad
            SET
                name='${player.name}',
                number=${player.number},
                position='${player.position}',
                image='${player.image}',
            WHERE id=${player.id}`
        const result = await mysql_interface.execute(sql);
        return result;
    }
    catch(error) {
        console.log(error);
    }
}


export default {
    get_squad,
    get_games,
    get_squad_order_by_number,
    get_games_order_by_date,
    add_user,
    signin,
    add_game,
    delete_game,
    update_game,
    add_player,
    delete_player,
    update_player,
    
}