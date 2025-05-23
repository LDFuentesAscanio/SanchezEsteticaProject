import { Status } from "../interfaces/IAppointmentInterface"

export interface AppointmentDto{
    date: Date,
    time: string,
    status?: Status,
    userId: number
}

export interface AppointmentScheduleDto{
    id: number,
    date: Date,
    time: string,
    status?: Status,
    userId: number
}

