
import fs from 'fs/promises';
import { config } from '../../config';
import { GameEvent } from '../../domain/types';
import { GameRepository } from './gameRepository';

// Interfacing (outgoing)
export class FileSystemGameRepository implements GameRepository {

  async save(events: GameEvent[]): Promise<void> {
    await fs.writeFile(config.saveFilePath, JSON.stringify(events));
  }

  async load(): Promise<GameEvent[]> {
    try {
      const data = await fs.readFile(config.saveFilePath, 'utf-8');
      return JSON.parse(data) as GameEvent[];
    } catch {
      return [];
    }
  }

  async clear(): Promise<void> {
    await fs.unlink(config.saveFilePath).catch(() => {});
  }
} 