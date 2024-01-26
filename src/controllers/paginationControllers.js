const { Hotel } = require('../../db.js');

const getItems = async (req, res) => {
    const { page = 1, size = 2 } = req.query;

    const options = {
        limit: Number(size),
        offset: (page - 1) * Number(size)
    };
        const { count, rows } = await Hotel.findAndCountAll(options);
        res.json({
            status: "success",
            total: count,
            Hotel: rows,
        });

}; 

module.exports = {
    getItems
}