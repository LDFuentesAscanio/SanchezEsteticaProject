import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Credential } from "./Credentials.entity"
import { Appointment } from "./Appointment.entity"


@Entity("users")
export class User{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string

    @Column({ type: "varchar", length: 100, unique: true, nullable: false })
    email: string

    @Column({ type: "date", nullable: false })
    birthdate: Date

    @Column({ type: "integer", unique: true, nullable: false })
    nDni: number

    @CreateDateColumn()
    createdAt?: Date

    @UpdateDateColumn()
    updatedAt?: Date

    @OneToOne(() => Credential, { cascade: true })
    @JoinColumn()
    credentials: Credential

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[]
}

