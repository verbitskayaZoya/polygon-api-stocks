import { apiKey } from '/apiKey.js'

const currentDate = new Date(getPreviousDate()).toLocaleString('en-US').slice(0, 8)
displayStocks()

async function displayStocks() {
  return document.getElementById("container")
    .innerHTML = `
       <h1> Most traded stocks on <span> ${currentDate} </span> </h1>
       <div class="cards-container"> ${await getDataFromStock()} </div>`
}

//DISPLAYING DATA FROM STOCK EXCHANGE

// ON FREE TIER YOU CAN'T DISPLAY CURRENT DATE'S DATA SO I HAD TO GET A PREVIOUS WEEKDAY
function getPreviousDate() {
  let previousDay = new Date().setDate(new Date().getDate() - 1)
  if (new Date(previousDay).toString().includes('Sat')) {
    previousDay = new Date(previousDay).setDate(
      new Date(previousDay).getDate() - 1,
    )
  }
  if (new Date(previousDay).toString().includes('Sun')) {
    previousDay = new Date(previousDay).setDate(
      new Date(previousDay).getDate() - 2,
    )
  }
  return new Date(previousDay).toJSON().slice(0, 10)
}

// FIRST I SENT A REQUEST TO GET ALL AGGREGATES AND FOUND MOST POPULAR FOUR BUT FOR THIS RESPONSE API DIDN'T PROVIDE TICKER'S NAME
// SO I SENT ANOTHER REQUEST WITH FOUR TICKERS TO GET THEIR NAMES
// THEN I COMBINED TWO ARRAYS TO DISPLAY INFO
// ON FREE TIER - 5 REQUESTS ARE ALLOWED PER MINUTE

async function getDataFromStock() {
  try {
    const response = await fetch(`https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${getPreviousDate()}?adjusted=true&apiKey=${apiKey}`)
    const tickersArrFromApi = await response.json()
    let topFourAggregatesArr = tickersArrFromApi.results
      .sort((a, b) => b.v - a.v)
      .slice(0, 4)
    const tickersNamesArrFromApi = await getTickersName(topFourAggregatesArr)
    const namesTickersArr = createArrNamesTickers(tickersNamesArrFromApi)
    topFourAggregatesArr = addNamesToTopFourTickers(
      topFourAggregatesArr,
      namesTickersArr,
    )
    const HTMLtext = getHTMLtext(topFourAggregatesArr)
    return HTMLtext
  } catch (err) {
    return 'Too many requests, please try again in a minute'
  }
}

async function getTickersName(popularTickersArr) {
  return await Promise.all(
    popularTickersArr.map(async item => {
      const response = await fetch(`https://api.polygon.io/v3/reference/tickers?ticker=${item.T}&active=true&apiKey=${apiKey}`)
      return response.json()
    }),
  )
}

function createArrNamesTickers(arrFromApi) {
  return arrFromApi.map(el => {
    if (el.results[0]) {
      const obj = {
        ticker: el.results[0].ticker,
        name: el.results[0].name,
      }
      return obj
    } else {
      const obj = {
        ticker: ' ',
        name: ' ',
      }
      return obj
    }
  })
}

function addNamesToTopFourTickers(popularAggregatesArr, namesArr) {
  return popularAggregatesArr.map(aggregate => {
    const nameTicker = namesArr.find(el => {
      return el.ticker == aggregate.T
    })
    const newAggregate = {
      ticker: aggregate.T,
      averagePrice: aggregate.vw,
      open: aggregate.o,
      close: aggregate.c,
      high: aggregate.h,
      low: aggregate.l,
      name: nameTicker ? nameTicker.name : 'No name',
    }
    return newAggregate
  })
}

function getHTMLtext(arr) {
  let info = ' '
  arr.forEach(el => {
    info += `
          <div class="investment-card">
              <p class="price"> $ ${el.averagePrice} </p> 
              <small> Average price </small>
              <div class="price-container">
                <p> Open: $ ${el.open} </p>
                <p> Low: $ ${el.low} </p> 
                <p> Close: $ ${el.close} </p>
                <p> High: $ ${el.high} </p>
            </div>
            <div class="name-container">
              <h2 class="ticker-name"> ${el.ticker} </h2>
              <h3 class="card-name"> ${el.name} </h3> 
            </div>
          </div>
       `
  })
  return info
}
