import { AppDataSourse } from "../config/data.sourse";
import { AppointmentDto, AppointmentScheduleDto } from "../dto/AppointmentDto";
import { Status } from "../interfaces/IAppointmentInterface"
import { AppointmentRepository } from "../repositories/Appointment.Repository";
import { UserRepository } from "../repositories/User.Repository";


export const getAppointmentsServices: () => Promise<AppointmentDto[]> = async(): Promise<AppointmentDto[]> => {

    const appointments = await AppointmentRepository.find({relations: {
        user: true
    }})
    if(!appointments || appointments.length === 0){
        throw new Error("No existen citas")
    }

    return appointments.map(appointment => ({
        id: appointment.id,    
        date: appointment.date, 
        time: appointment.time, 
        status: appointment.status, 
        userId: appointment.user.id, 
    }));

}

export const getAppointmentByIdServices: (id: number) => Promise<AppointmentScheduleDto | null>  = 
async (id: number): Promise<AppointmentScheduleDto | null>  => {
    const appointmentWanted = await AppointmentRepository.findOne({where: {id}, relations: ["user"]})

    if(!appointmentWanted){
        throw new Error(`No se pudo encontrar la cita con id: ${id}`)
    }

    const appointmentDTO: AppointmentScheduleDto = {
        id: appointmentWanted.id,
        date: appointmentWanted.date,
        time: appointmentWanted.time,
        status: appointmentWanted.status,
        userId: appointmentWanted.user.id,  
    };
    
    return appointmentDTO;
}

export const scheduleAppointmentServices: (appointmentData: AppointmentScheduleDto) => Promise<AppointmentScheduleDto | undefined> = 
async (appointmentData: AppointmentScheduleDto): Promise<AppointmentScheduleDto | undefined> => {

    const queryRunner = AppDataSourse.createQueryRunner(); 
    await queryRunner.connect();

    try {
        await queryRunner.startTransaction();
    
        // Validación de disponibilidad con userId
        await AppointmentRepository.validateAllowAppointment(appointmentData.date, appointmentData.time, appointmentData.userId);

        if (!appointmentData.userId) {
            throw new Error("El ID de usuario es obligatorio para crear una cita.");
        }

        const user = await UserRepository.findOneBy({ id: appointmentData.userId });

        if (!user) {
            throw new Error("El usuario con el ID especificado no existe.");
        }

        const newAppointment = AppointmentRepository.create({
            date: appointmentData.date,
            time: appointmentData.time,
            user: user,
        });

        newAppointment.user = user;
        newAppointment.status = Status.active;

        const savedAppointment = await queryRunner.manager.save(newAppointment);

        await queryRunner.commitTransaction();

        return {
            id: savedAppointment.id,
            date: savedAppointment.date,
            time: savedAppointment.time,
            status: savedAppointment.status,
            userId: savedAppointment.user.id, 
        };
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new Error(`${error}`);
    } finally {
        await queryRunner.release();
    }
};




export const cancelAppointmentServices: (id: number) => Promise<void> = 
async (id: number): Promise<void> => {
  const appointment = await AppointmentRepository.findOneBy({ id });

  if (!appointment) {
    throw new Error("Cita no encontrado");
  }

  const result = await AppointmentRepository.update({ id }, { status: Status.cancelled });

  if (result.affected === 0) {
    throw new Error("No se pudo actualizar el estado de la cita");
  }
};
