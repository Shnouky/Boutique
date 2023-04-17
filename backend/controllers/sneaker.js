const data = require('../data.json')

exports.getSneaker = (req, res) => {
    const id = parseInt(req.params.id);
    const sneakers = data.sneakers;

const sneaker = neaker.find()
    if (!sneakers){
        res.status(404).send('sneacker not found')

    }
    res.status(200).json({
    
        message: "Sneakers found succesfully",
        sneakers
    });
    
};