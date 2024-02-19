const { metricUsers, 
    metricIncomesHotels,
    metricNetIncome,
    metricBookingsHotels,
    metricRanking } = require('../controllers/metricsControllers');

const metricUsersHandler = async (req, res) => {
    const {start_date, end_date} = req.query;
    try{
        const users = await metricUsers(start_date, end_date);
        res.status(200).json(users);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const metricIncomesHotelsHandler = async (req, res) => {
    const {start_date, end_date} = req.query;
    try{
        const incomes = await metricIncomesHotels(start_date, end_date);
        res.status(200).json(incomes);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const metricNetIncomeHandler = async (req, res) => {
    const {start_date, end_date} = req.query;
    try{
        const netIncome = await metricNetIncome(start_date, end_date);
        res.status(200).json(netIncome);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const metricBookingsHotelsHandler = async (req, res) => {
    const {start_date, end_date} = req.query;
    try{
        const bookings = await metricBookingsHotels(start_date, end_date);
        res.status(200).json(bookings);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
const metricRankingHandler = async (req, res) => {
    const {start_date, end_date} = req.query;
    try{
        const ranking = await metricRanking(start_date, end_date);
        res.status(200).json(ranking);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}
module.exports = {
    metricUsersHandler,
    metricIncomesHotelsHandler,
    metricNetIncomeHandler,
    metricBookingsHotelsHandler,
    metricRankingHandler
}