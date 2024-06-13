import axiosInstance from './axiosInstance';

const getUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');

    return response.data;
  } catch (error: any) {
    console.log(error)
    if (error.response && error.response.status === 401) {
      throw new Error('Authentication failed. Please log in again.');
    } else {
      throw new Error('Failed to fetch users. Please try again later.');
    }
  }
}

const createUser = async (user: {name: string, email: string}) => {
  try {
    const response = await axiosInstance.post('/users', user);

    return response.data;
  } catch (error: any) {
    console.log(error)
    if (error.response && error.response.status === 401) {
      throw new Error('Authentication failed. Please log in again.');
    } else {
      throw new Error('Failed to create user. Please try again later.');
    }
  }
}

export default {
  getUsers,
  createUser
};
