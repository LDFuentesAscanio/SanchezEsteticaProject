import bcrypt from "bcrypt";
import { EntityManager } from "typeorm";
import { Credential } from "../entities/Credentials.entity";
import { CredentialRepository } from "../repositories/Credential.Repository";

export const createCredentialService = async (
    entityManager: EntityManager,
    username: string,
    password: string
): Promise<Credential> => {
    if (!password) {
        throw new Error("La contraseña no puede estar vacía.");
    }
    const passwordEncrypted = await bcrypt.hash(password, 10); // Encriptar con bcrypt

    const credentials = entityManager.create(Credential, {
        username,
        password: passwordEncrypted,
    });

    return await entityManager.save(credentials);
};

export const checkCredentials = async (
    username: string,
    password: string
): Promise<number | undefined> => {
    const usernameFound: Credential | null = await CredentialRepository.findOne({
        where: { username },
    });

    if (!usernameFound) {
        throw new Error(`El usuario ${username} no fue encontrado`);
    }

    if (!password) {
        throw new Error("La contraseña proporcionada no puede estar vacía.");
    }
    
    if (!usernameFound.password) {
        throw new Error("El usuario no tiene una contraseña asociada.");
    }

    const passwordMatch = await bcrypt.compare(password, usernameFound.password); // Comparar contraseñas

    if (!passwordMatch) {
        throw new Error(`Usuario o contraseña incorrectos`);
    }

    return usernameFound.id;
};
