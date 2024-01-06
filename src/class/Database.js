import mongoose from 'mongoose';

class Database {
  constructor(url) {
    this.url = url;
  }
  async init() {
    try {
      await mongoose.connect(this.url);

      console.log('Conexion exitosa con DB');
    } catch (error) {
      console.error(error);
    }
  }
}

export default Database;
