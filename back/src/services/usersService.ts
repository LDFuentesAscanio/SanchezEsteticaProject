
import { AppDataSourse } from "../config/data.sourse";
import { UserLoginDTO, UserLoginSuccesDTO, UserRegisterDTO, UsersDTO } from "../dto/UserDto";
import { Credential } from "../entities/Credentials.entity";
import { User } from "../entities/User.entity";
import { UserRepository } from "../repositories/User.Repository";
import { checkCredentials, createCredentialService } from "./credentialServices";


export const getUserService = async(): Promise<User[]> => {
    const users: User[] = await UserRepository.find()
    return users
}

export const getUserByIdService = async (id: string): Promise<User> => {

    const userFound = await UserRepository.findOne({
        where: { 
            id: parseInt(id, 10) 
        },
        relations: ["appointments"]
    })

    if(!userFound) throw new Error (`El ususario con id ${id} no existe`)
    else return userFound
}

export const registerUserService = async (user: UserRegisterDTO): Promise<User> => {

    const result = await AppDataSourse.transaction(async (entityManager) => {

        const userCredentials: Credential = await createCredentialService(entityManager, user.username, user.password)
        const newUser: User = entityManager.create(User, {
            name: user.name,
            birthdate: user.birthdate,
            email: user.email,
            nDni: user.nDni,
            credentials: userCredentials
        })
        return await entityManager.save(newUser)
    })
    
    return result
}

export const loginUserService = async (user: UserLoginDTO): Promise<UserLoginSuccesDTO> => {
    const credentialId: number | undefined = await checkCredentials(user.username, user.password);
    
    if (!credentialId) {
        throw new Error("Usuario o contraseña incorrectos.");
    }

    const userFound: User | null = await UserRepository.findOne({
        where: {
            credentials: {
                id: credentialId,
            },
        },
    });

    if (!userFound) {
        throw new Error(`No se encontró un usuario asociado con las credenciales.`);
    }

    return {
        login: true,
        user: {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
            birthdate: userFound.birthdate,
            nDni: userFound.nDni,
        },
    };
};
