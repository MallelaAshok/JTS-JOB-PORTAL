

export interface Otp{
    api_key: string;
    mobile: number;
    role_id: number;
}
export interface OtpResponse{
    status: string;
    temp_otp: number;
    mobile:number;
}

export interface signin{
    api_key: string
    mobile: number 
    otp_code: number 
    role: number 
    id: number
    company_name: string
}

export interface addJob{
    status: string;
    job_id: string; 
    
}

export interface Industry{
    id: number, 
    industry_name: string, 
    is_active: number 
}

export interface Role{
    id: number,
    role_name: string
    is_active: number
}
