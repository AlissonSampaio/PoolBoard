import { Router } from "express";

import { PlayerController } from "./controllers/PlayerController";
import { MatchController } from "./controllers/MatchController";


const routes = Router();

let playerController = new PlayerController();
routes.post("/player", playerController.create);
routes.get("/player/:id", playerController.get);
routes.get("/players", playerController.getAll);
routes.put("/player/:id", playerController.update);
routes.delete("/player/:id", playerController.delete);

let matchController = new MatchController();
routes.post("/match", matchController.create);
routes.get("/match/:player_id/:opponent_id", matchController.get)
routes.put("/match/:player_id/:opponent_id", matchController.update);


export { routes };