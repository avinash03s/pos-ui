import axiosInstance from "../interceptor/axiosInstance";


const getAdminProfile = async () => {
    const response = await axiosInstance.get("/api/admin/profile" );
    return response.data;
};


export {getAdminProfile};