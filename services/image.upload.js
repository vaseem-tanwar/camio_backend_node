module.exports.uploadImage = async (req, res, next) => {

    try {

        // to declare some path to store your converted image
        const path = './images/'+Date.now()+'.png'

        const imgdata = req.body.image;

        // to convert base64 format into random filename
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        
        fs.writeFileSync(path, base64Data,  {encoding: 'base64'});

        return res.send(path);

    } catch (e) {
        next(e);
    }
}