import { Repository } from "typeorm";
import { AppDataSourse  } from "../config/data.sourse";
import { User } from "../entities/User.entity";

export const UserRepository: Repository<User> = AppDataSourse.getRepository(User)