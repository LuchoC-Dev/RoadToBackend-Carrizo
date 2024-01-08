import mongoose from 'mongoose';

class Database {
  constructor(url) {
    this.url = url;
  }
  async init() {
    try {
      await mongoose.connect(this.url);
      console.log('Successful connection with Database');
    } catch (error) {
      console.error(`Error connecting to the Database\n${error}`);
    }
  }
}

export default Database;
