import axiosInstance from "../interceptor/axiosInstance";

export type Branch = {
    id: number;
    tenantId: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    branchCode: string;
    city: string;
    state: string;
    pincode: string;
    gstNumber: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
};

export type BranchRequest = {
    name: string;
    address: string;
    phone: string;
    email: string;
    branchCode: string;
    city: string;
    state: string;
    pincode: string;
    gstNumber: string;
};

const getAllBranches = async (): Promise<Branch[]> => {
    const response = await axiosInstance.get("/api/branches");
    return response.data;
};

const getBranchById = async (id: number): Promise<Branch> => {
    const response = await axiosInstance.get(`/api/branches/${id}`);
    return response.data;
};

const createBranch = async (request: BranchRequest): Promise<Branch> => {
    const response = await axiosInstance.post("/api/branches", request);
    return response.data;
};

const updateBranch = async (id: number, request: BranchRequest): Promise<Branch> => {
    const response = await axiosInstance.put(`/api/branches/${id}`, request);
    return response.data;
};

const activateBranch = async (id: number): Promise<void> => {
    await axiosInstance.patch(`/api/branches/${id}/activate`);
};

const deactivateBranch = async (id: number): Promise<void> => {
    await axiosInstance.patch(`/api/branches/${id}/deactivate`);
};

export {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    activateBranch,
    deactivateBranch,
};