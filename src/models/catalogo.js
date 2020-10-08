const { Schema, model } = require('mongoose');

const TiposDePagoSchema = new Schema({
   zelle: {
      type: String
   },
   paypal: {
      type: String
   },
   transferencia: {
      type: String
   },
   pagomovil: {
      type: String
   },
   efectivo: {
      type: Boolean
   }
});

const redesSocialesSchema = new Schema({
   instagram: {
      type: String
   },
   facebook: {
      type: String
   },
   twitter: {
      type: String
   }
});

const CatalogoSchema = new Schema({
   nombre: {
      type: String,
      required: true
   },
   telefono: {
      type: String,
      required: true
   },
   img: {
      type: String
   },
   tiposDePago: [TiposDePagoSchema],
   redesSociales: [redesSocialesSchema],
   usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario'
   },
   productos: [{
      type: Schema.Types.ObjectId,
      ref: 'Producto'
   }]
}, {
   versionKey: false
});

CatalogoSchema.method('toJSON', function() {
   const {_id, ...object} = this.toObject();
   object.id = _id;
   return object;
});

module.exports = model('Catalogo', CatalogoSchema);