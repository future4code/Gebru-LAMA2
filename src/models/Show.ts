enum DAY_TYPES {
    SEXTA = 'SEXTA',
    SABADO = 'SÁBADO',
    DOMINGO = 'DOMINGO'
}

export type show = {
    id: string
    weekDay: DAY_TYPES
    startTime: number
    endTime: number
    bandId: string
}

export interface RegisterShowDTO {
    weekDay: DAY_TYPES
    startTime: number
    endTime: number
    bandId: string
    token: string
}