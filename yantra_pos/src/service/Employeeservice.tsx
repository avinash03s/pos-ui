import axiosInstance from "../interceptor/axiosInstance";

export type Role =
    | "ROLE_USER"
    | "ROLE_ADMIN"
    | "ROLE_CASHIER"
    | "ROLE_BRANCH_MANAGER"
    | "ROLE_STORE_MANAGER";

export type Employee = {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: Role;
    tenantId: number;
    branchId: number | null;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    lastLoginAt: string | null;
};

export type AddEmployeeRequest = {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: Role;
    branchId: number | null;
};

const getAllEmployees = async (): Promise<Employee[]> => {
    const response = await axiosInstance.get("/api/employees");
    return response.data;
};

const getEmployeesByBranch = async (branchId: number): Promise<Employee[]> => {
    const response = await axiosInstance.get(`/api/employees/branch/${branchId}`);
    return response.data;
};

const addEmployee = async (request: AddEmployeeRequest): Promise<Employee> => {
    const response = await axiosInstance.post("/api/employees", request);
    return response.data;
};

const deactivateEmployee = async (id: number): Promise<void> => {
    await axiosInstance.patch(`/api/employees/${id}/deactivate`);
};

export {
    getAllEmployees,
    getEmployeesByBranch,
    addEmployee,
    deactivateEmployee,
};