import multer from 'multer';
import path from 'path';                   // cuida dos diretórios
import crypto from 'crypto';               // cria um número hexadecimal para o nome do arquivo
import fs from 'fs';    

const baseUploadDir = path.resolve(process.cwd(),'public/uploads'); 

const verificaDir = (dir) =>{  
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, {recursive: true})
    }
};


const createMulter = ({folder, allowedTypes, fileSize}) =>{
    const uploadDir = path.join(baseUploadDir, folder);

    verificaDir(uploadDir);

    const storage = multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, uploadDir)
        },
        filename: (req, file, cb) => {
            const hash = crypto.randomBytes(12).toString('hex');
            cb(null, `${hash}-${file.originalname}`);
        }
    });

    const fileFilter = (req, file, cb) => {
        if(!allowedTypes.includes(file.mimetype)){        //allowedTypes é os tipo de arquivos permitidos
            return cb(new Error('Tipo de arquivo não permitido'));
        }
        cb(null, true);
    }

    return multer({
        storage,
        limits: {fileSize},
        fileFilter
    });

};

export default createMulter;