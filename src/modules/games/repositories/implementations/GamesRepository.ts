import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {

    const games =  await this.repository
    .createQueryBuilder("games")
    .where("LOWER(games.title) like LOWER(:name)", { name: `%${param}%`})
    .getMany();

    console.log(games)

    return games;
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query("SELECT COUNT(games.id) FROM games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[] | undefined> {

    const game =  await this.repository
    .createQueryBuilder("games")
    .innerJoinAndSelect("games.users", "users")
    .where("games.id = :id", { id })
    .getOne();

    if(game){
      return game.users;
    } 
      // Complete usando query builder
  }
}
