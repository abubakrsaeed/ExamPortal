import axios from "axios";

class User {
    static userAuth(username, password) {
        return axios.post('http://localhost:8081/user/auth',{
            username,
            password
        }).then((res)=> {
            return res
        }).catch((error)=>{
            // console.log(error)
           throw error
        })
    }
    static createUser({username,password,emailId,roleId}) {
        return axios.post('http://localhost:8081/user/create',{
            username,
            password,
            email_id: emailId,
            role_id: roleId
        }).then((res)=> {
            console.log('data from backend',res)
            return res
        }).catch((error)=>{
            // console.log(error)
            throw error
        })
    }
}

export default User;