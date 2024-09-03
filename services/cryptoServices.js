const axios = require('axios')


const getExchanges = async ()=> {
    try {
        const options = {
          method: 'GET',
          url: 'https://coingecko.p.rapidapi.com/exchanges',
          headers: {
            'x-rapidapi-key': '3881f835b7mshcdc185d253e66b4p1381b6jsn94eb41fcf016',
            'x-rapidapi-host': 'coingecko.p.rapidapi.com'
          }
        };
        
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
}
const getCryptoCoinData = async(coinId)=> {
    const options = {
      method: 'GET',
      url: `https://coingecko.p.rapidapi.com/coins/${coinId}`,
      params: {
        localization: 'true',
        tickers: 'true',
        market_data: 'true',
        community_data: 'true',
        developer_data: 'true',
        sparkline: 'false'
      },
      headers: {
        'x-rapidapi-key': '3881f835b7mshcdc185d253e66b4p1381b6jsn94eb41fcf016',
        'x-rapidapi-host': 'coingecko.p.rapidapi.com'
      }
    }
    try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        // console.error(error);
        return null;
      }
}

const getCryptoCoinDetails = async (uuid) => {

    const options = {
      method: 'GET',
      url: `https://coinranking1.p.rapidapi.com/coin/${uuid}`,
      params: {
        referenceCurrencyUuid: 'yhjMzLPhuIDl',
        timePeriod: '24h',
        // uuid: uuid
      },
      headers: {
        'x-rapidapi-key': '3881f835b7mshcdc185d253e66b4p1381b6jsn94eb41fcf016',
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        // console.error(error);
        return null
    }
    }
  const getCryptoCoinList = async ()=> {
    const options = {
      method: 'GET',
      url: 'https://coingecko.p.rapidapi.com/coins/list',
      headers: {
        'x-rapidapi-key': '3881f835b7mshcdc185d253e66b4p1381b6jsn94eb41fcf016',
        'x-rapidapi-host': 'coingecko.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(options);
      return response.data
    } catch (error) {
      console.error('getCryptoCoinList',error);
      return null;
    }
  }
module.exports = {
    getExchanges,
    getCryptoCoinData,
    getCryptoCoinDetails,
    getCryptoCoinList
}