const { Item } = require('../../db.js');

const getItems = async (req, res) => {
    
    const { page = 1, limit = 8 } = req.query;

        const { count, rows } = await Item.findAndCountAll({
          offset: (page - 1) * limit,
        });
    
        res.json({
          data: rows,
          totalItems: count,
          currentPage: parseInt(page),
          pageSize: parseInt(limit),
        });
}

module.exports = {
    getItems
}