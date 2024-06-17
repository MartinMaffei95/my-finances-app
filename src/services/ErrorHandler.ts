import axios, { AxiosError } from 'axios'
//import AuthService from '@/services/auth.service'

export const errorRequestHandler = (error: any | AxiosError) => {
   // const auth = new AuthService()
    
    if (axios.isAxiosError(error)) {
        if (error?.response?.status === 404) {
            throw error?.response?.data?.message
        }
        if (error.response?.data.message) {
           // auth.checkLoggedStatus(error.response?.data.message)
           console.log(error.response?.data.message)
        }
        throw error?.response?.data
    }

    throw error
}