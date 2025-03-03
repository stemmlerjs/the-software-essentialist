
import { GameEvent } from "../../domain/types";

export interface GameRepository {
  save(events: GameEvent[]): Promise<void>;
  load(): Promise<GameEvent[]>;
  clear(): Promise<void>;
}
