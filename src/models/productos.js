const { Schema, model } = require('mongoose');

const ProductoSchema = new Schema({
   nombre: {
      type: String,
      required: true
   },
   descripcion: {
      type: String,
      required: true
   },
   categoria: {
      type: String,
      required: true
   },
   precio: {
      type: Number,
      required: true
   },
   stock: {
      type: Number,
      required: true,
      default: 0
   },
   img: {
      type: String
   },
   catalogo: {
      type: Schema.Types.ObjectId,
      ref: 'Catalogo'
   }
}, {
   versionKey: false
});

ProductoSchema.method('toJSON', function() {
   const {_id, ...object} = this.toObject();
   object.id = _id;
   return object;
});

module.exports = model('Producto', ProductoSchema);