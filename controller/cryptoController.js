const {getExchanges,getCryptoCoinData,getCryptoCoinDetails} = require('../services/cryptoServices') 


const exchangesHandler = async (req, res)=> {
    try {
        const exchanges = await getExchanges()
        res.status(200).json(exchanges)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Internal server error'})
    }
}

const cryptoCoinDataHandler = async (req, res)=> {
    try {
        const {coinId} = req.query

        const coinDetails = await getCryptoCoinDetails(coinId)
        if (!coinDetails){
            const coinData = await getCryptoCoinData(coinId)
            res.status(200).json(coinData)
        }else{
            res.status(200).json(coinDetails)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Internal server error'})
    }
}


module.exports = {
    exchangesHandler,
    cryptoCoinDataHandler
}