type Customer = {
    id: string
    firstName: string
    lastName: string
    role: string
    email: string
}

type Order = {
    id: string
    status: string
    start_end_date: string
    estimated_start: string
    estimated_end: string
    estimated_duration: number
    real_start?: string
    real_end?: string
    real_duration?: number
    manual_price?: number
    timer_value?: number
    customer: Customer
}