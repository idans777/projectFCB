import express, {NextFunction, query, request, Request, response, Response} from 'express';
import queries from './queries';
import { auth, auth_admin } from './middlewere';
import { get_user_id } from './jwt';
import { add_game, add_player, delete_game, delete_player, login, register, update_game, update_player, } from './logic';
import User from './classes/user';
import Player from './classes/player';
import Game from './classes/game';


const route = express.Router();

/* GET requests */
route.get("/",  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("server working");
})

route.get("/get_games", auth, async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await queries.get_games());
})

route.get("/get_squad", auth, async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await queries.get_squad());
})

route.get("/get_squad_order_by_number", auth, async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await queries.get_squad_order_by_number());
})

route.get("/get_games_order_by_date", auth, async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await queries.get_games_order_by_date());
})


/* POST requests */
route.post("/signin", async(request: Request, response:Response, next:NextFunction) => {
    const user_name = request.headers?.user_name as string
    const password = request.headers?.password as string
    const result = login(user_name, password).then((token) => {
        if(token) {
            get_user_id(token).then((id) => {
                response.status(200).send({
                    'msg': 'Logged in!',
                    'id': id,
                    'token': token
                })
            }).catch((err) => {
                response.status(200).send({
                    'msg': 'Logged in! (error getting user id)',
                    'id': 0,
                    'token': token
                })
            })
        }
        else {
            response.status(401).send("NO")
        }
    })
})

route.post("/signup", async(request: Request, response:Response, next:NextFunction) => {
    const first_name = request.query?.first_name as string
    const last_name = request.query?.last_name as string
    const user_name = request.query?.user_name as string
    const password = request.query?.password as string
    const user = new User(first_name, last_name, user_name, password)

    register(user).then((ok) => {
        if(ok > 0) {
            response.status(201).json({
                'msg': 'user added successfully',
                'user_id': ok,
            })
        }
        else if(ok == -1) {
            response.status(409).json({
                'msg': 'username is not allowed',
            })
        }
        else {
            response.status(409).json({
                'msg': 'user name already taken',
            })
        }
    })
})

route.post("/add-player", auth_admin, async(request: Request, response:Response, next:NextFunction) => {
    const {id, name, number, position, image} = request.body?.data
    const player:Player = new Player(name+'', parseInt(number+''), position+'', image+'' )
    add_player(player).then((ok) => {
        if(ok) {
            response.status(200).send({msg: 'player added'})
        }
        else {
            response.status(201).send({msg: 'player not added'})
        }
    })
})

route.post("/update-player", auth_admin, async(request: Request, response:Response, next:NextFunction) => {
    const { id, name, number, position, image} = request.body?.data
    const player:Player = new Player(name+'', parseInt(number+''), position+'', image+'')
    update_player(player).then((ok) => {
        if(ok) {
            response.status(200).send({msg: 'player updated'})
        }
        else {
            response.status(201).send({msg: 'player not updated'})
        }
    })
})

route.post("/add-game", auth_admin, async(request: Request, response:Response, next:NextFunction) => {
    const {id, opponent, location, date, time, tournament} = request.body?.data
    const game:Game = new Game(opponent+'', location+'', date, time, tournament+'' )
    add_game(game).then((ok) => {
        if(ok) {
            response.status(200).send({msg: 'game added'})
        }
        else {
            response.status(201).send({msg: 'game not added'})
        }
    })
})

route.post("/update-game", auth_admin, async(request: Request, response:Response, next:NextFunction) => {
    const {id, opponent, location, date, time, tournament} = request.body?.data
    const game:Game = new Game(opponent+'', location+'', date, time, tournament+'' )
    update_game(game).then((ok) => {
        if(ok) {
            response.status(200).send({msg: 'game updated'})
        }
        else {
            response.status(201).send({msg: 'game not updated'})
        }
    })
})


/* DELETE requests */

route.delete("/delete-player/:player_id", auth_admin, async(request: Request, response:Response, next:NextFunction) => {
    const id = parseInt(request.params?.player_id)
    delete_player(id).then((ok) => {
        if(ok) {
            response.status(200).send({msg: 'player deleted'})
        }
        else {
            response.status(201).send({msg: 'player not deleted'})
        }
    })
})

route.delete("/delete-game/:game_id", auth_admin, async(request: Request, response:Response, next:NextFunction) => {
    const id = parseInt(request.params?.game_id)
    delete_game(id).then((ok) => {
        if(ok) {
            response.status(200).send({msg: 'game deleted'})
        }
        else {
            response.status(201).send({msg: 'game not deleted'})
        }
    })
})


export default route;