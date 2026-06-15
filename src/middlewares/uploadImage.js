import createMulter from "../configs/produtoMulter.js";

const uploadImage = createMulter({
    folder: 'images',
    allowedTypes: ['image/jpeg', 'image/png'],
    fileSize: 10 * 1024 * 1024  // 10 MB

}).single('image')  //um arquivo por vez e na hora de enviar deve ter o nome image

export default uploadImage;