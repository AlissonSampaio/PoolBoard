import { Request, Response } from "express";
import { MatchService } from "../services/MatchService";

export class MatchController {
  async create(request: Request, response: Response) {
    const { player_id, player_points, opponent_id, opponent_points } =
      request.body;

    const service = new MatchService();

    const result = await service.create({
      player_id,
      player_points,
      opponent_id,
      opponent_points,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json();
  }

  async get(request: Request, response: Response) {
    const { player_id, opponent_id } = request.params;

    const service = new MatchService();

    const match = await service.get({ player_id, opponent_id });

    if (!match) {
      return response.status(400).json("Match does not exists!");
    }

    return response.json(match);
  }

  async update(request: Request, response: Response) {
    const { player_id, opponent_id } = request.params;
    const { player_points, opponent_points } = request.body;

    const service = new MatchService();

    const result = await service.update({
      player_id,
      player_points,
      opponent_id,
      opponent_points,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.status(200).json("Updated successfully");
  }
}
