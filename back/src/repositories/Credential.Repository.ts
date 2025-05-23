import { Repository } from "typeorm";
import { AppDataSourse  } from "../config/data.sourse";
import { Credential } from "../entities/Credentials.entity";



export const CredentialRepository: Repository<Credential> = AppDataSourse.getRepository(Credential)