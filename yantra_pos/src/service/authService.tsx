import axiosInstance from "../interceptor/axiosInstance"

const registerUser=async(user:any)=>{
    return axiosInstance.post('/api/auth/register',user)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error;})
}

const loginUser=async(user:any)=>{
    return axiosInstance.post('/api/auth/login',user)
    .then((response:any)=>response.data)
    .catch((error:any)=>{throw error;})
}

export {registerUser,loginUser}