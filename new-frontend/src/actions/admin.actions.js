import axios from "./axios";

export const login = (data) => {
    return axios.post(`/login`, data);
}

export const logout = () => {
    return axios.post(`/logout`);
}
export const foegetpasword = ( data) => {
    return axios.post(`/foegetpasword`, data);
}

export const employeessear = (employeeNumber) => {
       return axios.get(`/employees/${employeeNumber}`);
  
}
export const allemployee = () => {
    return axios.get('/employees');

}


export const attaendansear = (employeeNumber) => {
    return axios.get(`/employees/attendance/${employeeNumber}`);

}
export const attaendandaet = (employeeNumber) => {
    return axios.get(`/employees/attendancedetail/${employeeNumber}`);

}
export const misdatemp = (employeeNumber) => {
    return axios.get(`/employees/miscdata/${employeeNumber}`);

}

export const certificates = (employeeNumber) => {
    return axios.get(`/employees/certificates/${employeeNumber}`);

}

export const salaries = (employeeNumber) => {
    return axios.get(`/employees/salaries/${employeeNumber}`);

}
export const voldeductions = (employeeNumber) => {
    return axios.get(`/employees/voldeductions/${employeeNumber}`);

}

export const payroll = (employeeNumber) => {
    return axios.get(`/employees/payroll/${employeeNumber}`);

}
export const w2s = (ssn) => {
    return axios.get(`/employees/pfrs860s/${ssn}`);

}
export const payrollCheck = (SSN,RUN) => {
    return axios.get(`/employees/payrollCheck/?SSN=${SSN}&RUN=${RUN}`);

}
export const payrollCheckDeductions = (SSN,RUN) => {
    return axios.get(`/employees/payrollCheckDeductions/?SSN=${SSN}&RUN=${RUN}`);

}




