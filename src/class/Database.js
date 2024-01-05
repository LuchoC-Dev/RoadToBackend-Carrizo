import mongoose from 'mongoose';
import { DB_URL } from '../utils/env.js';

class Database {
  constructor(http) {
    this.http = http;
  }
  async init() {
    try {
      await mongoose.connect(DB_URL);

      console.log('Conexion exitosa con DB');
    } catch (error) {
      console.error(error);
    }
  }
}

export default Database;
