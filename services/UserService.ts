import { default as userRepository } from '../repositories/UserRepository.ts';
import { shaEncrypt } from "../utils/encodehelper.ts";


class UserService {

    isLoginUser = async (account: string, password: string)=>{
        password = shaEncrypt(password);    
        return await userRepository.isLogin(account, password);
    }

    fetchUsers = async () => {
        return await userRepository.getUsers();
    }
}

export default new UserService();