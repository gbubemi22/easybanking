import User from "../model/User.js";
import NotFoundError from "../errors/not-found.js";

const userRepository = {
  createUser: async (
    first_name,
    last_name,
    email,
    password,
    phone_number,
    account_number
  ) => {
    
      const createdUser = await User.create({
        first_name,
        last_name,
        email,
        password,
        phone_number,
        account_number,
      });
      return createdUser;
   
  },

  getUserByEmail: async (email) => {
    const user = await User.findOne({ email: email });

    // if (!user) {
    // throw new NotFoundError(`User not found `)
    // }
    return user;
  },

  getuserByID: async (id) => {
    const user = await User.findOne(id);
    if (!user) {
      throw new NotFoundError(`User not found `);
    }
    return user;
  },
};

export default userRepository;
