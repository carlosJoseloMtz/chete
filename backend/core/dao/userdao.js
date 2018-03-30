import UserModel from '../models/usermodel'
import * as LOG from 'winston'

class UserDao {

  findByUid (uid) {
    return UserModel.findOne({ uid: uid })
  }

}

export default UserDao
