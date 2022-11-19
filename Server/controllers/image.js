import Tesseract from "tesseract.js";

class ImageGetter{
    async getImage(req, res){
        try{
            const Jimp = require('jimp');
            const {img} = req.files;
            const types = ["jpg", "jpeg", "png"];
            const fileName = Date.now() + '--' + img.name;
            if (types.indexOf(fileName.split('.').pop()) === -1){
                return res.status(400).json({message: "Неверный формат файла"})
            }
            await img.mv(path.resolve('Server/images', '..', 'images', fileName));
             Jimp.read(img)
                 .then(img => {
                     img.normalize();
                 })
            img.normalize();
            const post = await Tesseract.recognize(img, "rus+eng");
            res.json(post);
        }
        catch(e){
            console.log(e);
            res.status(500).json({message:"Что-то пошло не так"});
        }
            
    }
}

export default new ImageGetter();