import { In, Repository } from "typeorm";

import { UserRepo } from "./user-repo";
import { User, UserProperties } from "./user";
import { getDataSource } from "../data-source";
import { UserSchema } from "./user-entity";

export class UserTypeormRepository implements UserRepo  {
  public constructor(
    private typeormRepository: Repository<UserProperties>,
  ) {}

    public async exists(userEmail: string): Promise<boolean> {
        const user = await this.typeormRepository.findOneBy({ email: userEmail });
        return !!user;
    }

    public async getUserByUserId(userId: number): Promise<User | null> {
      const res = await this.typeormRepository.findOneBy({
          id: userId
      });

      return res ? new User(res) : null;
    }

    public async getUserByUserName(userName: string): Promise<User | null> {
      const res = await this.typeormRepository.findOneBy({userName})
      return res ? new User(res) : null;
    }

    public async save(user: User): Promise<User> {
        await this.typeormRepository.upsert(user, ['id']);
        user.id = this.typeormRepository.getId(user);
        return user;
    }

  public static async factory() {
    const datasource = await getDataSource();
    return new UserTypeormRepository(datasource.getRepository(UserSchema));
  }

}
