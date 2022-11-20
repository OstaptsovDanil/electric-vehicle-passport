import Tesseract from "tesseract.js";
import path from "path";
import PythonShell from "python-shell"
import {spawn} from "child_process"
import fs from "fs"

class ImageController {
    async uploadImage(req, res) {
        try {
            const {img} = req.files;
            const types = ["JPG", "JPEG", "PNG", "HEIC", "jpg", "jpeg", "png", "heic"];

            const fileName = Date.now() + '--' + img.name;

            if (types.indexOf(fileName.split('.').pop()) === -1) {
                return res.status(400).json({
                    message: "Неверный формат файла"
                })
            }

            let img_path = 'Storage/images/ap.' + fileName.split('.').pop() 
            await img.mv(img_path)
            
            const pathToMainPy = 'D:\\Programming\\ElectrocarIdentification\\Server\\Algorithm\\main.py'

            const childPython = spawn('python', [pathToMainPy, img_path]);

            childPython.stdout.on('data', async (data) => {

                console.log(`stdout: ${data}`)
            });

            childPython.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);

                return res.json({
                    message: "ban"
                })
            });

            childPython.on('close', async (code) => {
                console.log(`child process exited with code ${code}`);

                const { data: { text } } = await Tesseract.recognize(img_path, "rus+eng");

                //Удаление файла
                fs.unlink(img_path, err => {
                    if(err) 
                        console.log(err); // не удалось удалить файл
                    console.log('Файл успешно удалён');
                });


                return res.json({
                    text
                });
            });

           
        }
        catch(e){
            console.log(e);
            res.status(500).json({
                message: "Что-то пошло не так"
            });
        }
            
    }
}

export default new ImageController();