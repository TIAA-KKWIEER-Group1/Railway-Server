import { config } from 'dotenv';
import { connectDB } from '../../config/database.js';
import promptSync from 'prompt-sync';
import bcrypt from 'bcryptjs';
import * as adminServices from '../../services/admin.services.js';

config();
connectDB();
const prompt = promptSync();

const addAdmin = async () => {
  const userName = prompt('Admin username : ');
  const password = prompt('password : ');

  const hashPassword = await bcrypt.hash(password, 12);

  const admin = {
    userName,
    password: hashPassword,
  };

  try {
    await adminServices.createAdmin(admin);
    console.log('admin account created successfully');
  } catch (error) {
    console.log(error);
  }
};

addAdmin();
