import Tesseract from "tesseract.js";
import path from "path";

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

            await img.mv(path.resolve('image', '..', 'Storage/images', fileName));

            //За это отвечает Даня
            //const post = await Tesseract.recognize(img, "rus+eng");

            return res.json({
                message: "ОК. Картинка загружена на сервер",
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