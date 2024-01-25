const { getItems } = require('../controllers/itemsControllers');

const getItemsHandler = async (req, res) => {
    
    try{
        const items = await getItems(req, res);
        res.status(200).json(items);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getItemsHandler
}