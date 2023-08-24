type Customer = {
    id: string
    firstName: string
    lastName: string
    role: string
    email: string
}

type Order = {
    [key: string]: string | boolean | number | Customer | undefined
    id: string
    status: string
    start_end_date: string
    estimated_start: string
    estimated_end: string
    estimated_duration: number
    real_start?: string
    real_end?: string
    elapsed_time?: number
    real_duration?: number
    manual_price?: number
    timer_value?: number
    start_date: string
    end_date: string
    customer: Customer
}