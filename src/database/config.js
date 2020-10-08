const mongoose = require('mongoose');

const conexionBd = async () => {
   try {
      await mongoose.connect(process.env.CONEXION, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
         useCreateIndex: true,
      });
      console.log('Base de datos conectada');
   } catch (error) {
      console.log(error);
      throw new Error('Error a la hora de iniciar la BD.');
   }
}

module.exports = {
   conexionBd
}