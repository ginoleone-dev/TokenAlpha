import { Box, Container, Typography, TextField, Button } from "@mui/material";
import React, { useState, useRef } from "react";
import image from "../Images/cryptoImage.jpeg";
import { useQuery } from "@tanstack/react-query";
import Selectcoin from "./SelectCoin";
import { useDispatch, useSelector } from "react-redux";
import PriceBarChart from "./PriceBarChart";
import MarketCapBarChart from "./MarketCapBarChart";
import News from "./News";
import axios from "axios";
import SelectOtherCoins from "./SelectOtherCoins";
import { setTokenAndDay } from "../ReduxContext/store";
import TopTokensPieChart from "./TopTokensPieChart";
import DaysButtons from "./DaysButtons";

export default function Home() {
  const dispatch = useDispatch();

  const scrollRef = useRef(null);

  // Redux
  const currentCoin = useSelector((state) => state.tokenInfo.value.coin);
  const currentDays = useSelector((state) => state.tokenInfo.value.days);
  //
  const [coinDataLoaded, setCoinDataLoaded] = useState(false);
  const [newsDataLoaded, setNewsDataLoaded] = useState(false);

  // Used to display the current coin with a capital letter since the api doesnt allow capital letters
  const capitalizedCoin =
    currentCoin?.charAt(0)?.toUpperCase() + currentCoin?.slice(1);

  // fetch function for general token data
  const fetchTokenData = async () => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${currentCoin}/market_chart?vs_currency=usd&days=300&interval=daily`
    );
    setCoinDataLoaded(true);
    return res.data;
  };

  const { data: parentCoinData } = useQuery(
    ["token", currentCoin],
    fetchTokenData,
    { staleTime: Infinity }
  );

  // Fetch function for news data

  const fetchNewsData = async () => {
    const res = await axios
      .get(
        `https://gnews.io/api/v4/search?q=${currentCoin}&lang=en&token=3dce58a266da2613dbd9ce7312c8ed63`
      )
      .catch((err) => setNewsDataLoaded(false));
    setNewsDataLoaded(true);
    return res.data;
  };

  const { data: news } = useQuery(["new", currentCoin], fetchNewsData);
  const newsData = news?.articles.slice(0, 6);

  // Fetch function for general token info (used for displaying current price and current mkcap)
  const fetchCoinCurrent = async () => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${currentCoin}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    return res.data;
  };

  const { data: generalTokenList } = useQuery(
    ["coin", currentCoin],
    fetchCoinCurrent
  );

  const currentPrice =
    generalTokenList?.market_data?.current_price?.usd?.toFixed(4);

  const currentMarketCap = generalTokenList?.market_data?.market_cap?.usd;

  // Fetch function for 8 top tokens, used in pie chart

  const fetchTopTokens = async () => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=false`
    );
    return res.data;
  };

  const { data: topTokensListData } = useQuery(["topToken"], fetchTopTokens);

  const topTokensNamesList = topTokensListData?.map((token) => token?.name);
  const topTokensMarketCapList = topTokensListData?.map(
    (token) => token?.market_cap
  );

  // Market Cap

  const lastMarketCap = parentCoinData?.market_caps?.slice(-currentDays)[
    currentDays - 1
  ][1];

  const firstMarketCap = parentCoinData?.market_caps?.slice(-currentDays)[0][1];

  const marketCapDifference = (
    ((lastMarketCap?.toFixed(2) - firstMarketCap?.toFixed(2)) /
      firstMarketCap?.toFixed(2)) *
    100
  )?.toFixed(2);

  // Volume

  // const volumeByDays = parentCoinData?.total_volumes
  //   ?.slice(-currentDays)
  //   ?.map((volume) => {
  //     return volume[1];
  //   });

  const lastVolume = parentCoinData?.total_volumes?.slice(-currentDays)[
    currentDays - 1
  ][1];

  const firstVolume = parentCoinData?.total_volumes?.slice(-currentDays)[0][1];

  const volumeDifference = (
    ((lastVolume?.toFixed(2) - firstVolume?.toFixed(2)) /
      firstVolume?.toFixed(2)) *
    100
  )?.toFixed(2);

  console.log(newsData);

  // parentCoinData.prices gives an array of tuples the contain a timestamp for the day and the price, same for mkcap and volume.
  const pricesLast1Year = parentCoinData?.prices
    ?.slice(-currentDays)
    ?.map((price) => {
      return price[1];
    });

  const marketCapLast1Year = parentCoinData?.market_caps
    ?.slice(-currentDays)
    ?.map((mkCap) => {
      return mkCap[1];
    });

  const datesLast1Year = parentCoinData?.prices
    ?.slice(-currentDays)
    ?.map((timestamp) => {
      const date = new Date(timestamp[0]).toString();

      return date.split(" ").slice(1, 3).join(" ");
    });

  const avgPrice = (
    pricesLast1Year?.reduce((sum, currentPrice) => sum + currentPrice) /
    currentDays
  )?.toFixed(4);

  const lowestPrice = pricesLast1Year
    ?.reduce((sum, currentPrice) => Math.min(sum, currentPrice))
    ?.toFixed(4);

  const highestPrice = pricesLast1Year
    ?.reduce((sum, currentPrice) => Math.max(sum, currentPrice))
    ?.toFixed(4);

  // Charting

  const [displayChartType, setDisplayChartType] = useState(true);

  const priceBarChartData = {
    labels: datesLast1Year,
    datasets: [
      {
        label: `Price of ${capitalizedCoin} Last ${currentDays} days (in USD)`,
        data: pricesLast1Year,
        backgroundColor: ["white"],
        borderColor: "#D6D6D6",
        color: "#white",
        tension: 0.1,
      },
    ],
    options: {
      responsive: true,
      scales: {
        y: {
          ticks: { color: "#D6D6D6", beginAtZero: true },
        },
        x: {
          ticks: { color: "#D6D6D6", beginAtZero: true },
        },
      },
      plugins: {
        // 'legend' now within object 'plugins {}'
        legend: {
          labels: {
            color: "white", // not 'fontColor:' anymore

            font: {
              size: 14, // 'size' now within object 'font {}'
            },
          },
        },
      },
    },
  };

  const marketCapBarChartData = {
    labels: datesLast1Year,
    datasets: [
      {
        label: `Market Cap of ${capitalizedCoin} Last ${currentDays} days (in USD)`,
        data: marketCapLast1Year,
        backgroundColor: ["white"],
        borderColor: "#D6D6D6",
        color: "#white",
        tension: 0.1,
      },
    ],
    options: {
      responsive: true,
      scales: {
        y: {
          ticks: { color: "#D6D6D6", beginAtZero: true },
        },
        x: {
          ticks: { color: "#D6D6D6", beginAtZero: true },
        },
      },
      plugins: {
        // 'legend' now within object 'plugins {}'
        legend: {
          labels: {
            color: "#D6D6D6", // not 'fontColor:' anymore

            font: {
              size: 14, // 'size' now within object 'font {}'
            },
          },
        },
      },
    },
  };

  const TopTokensPieChartData = {
    labels: topTokensNamesList,
    datasets: [
      {
        label: "Top tokens by market cap",
        data: topTokensMarketCapList,
        backgroundColor: [
          "rgba(33,37,41, 0.8)",
          "rgba(52,58,64, 0.8)",
          "rgba(73,80,87,0.8)",
          "rgba(108,117,125, 0.8)",
          "rgba(206,212,218, 0.8)",
          "rgba(222, 226, 230, 1)",
          "rgba(233, 236, 239, 1)",
          "rgba(248, 249, 250, 1)",
        ],
        borderColor: [
          "rgba(255,255,255, 1)",
          "rgba(255,255,255, 1)",
          "rgba(255,255,255, 1)",
          "rgba(255,255,255, 1)",
          "rgba(255,255,255, 1)",
          "rgba(255,255,255, 1)",
          "rgba(255,255,255, 1)",
          "rgba(255,255,255, 1)",
        ],
        borderWidth: 1,
      },
    ],
    options: {
      responsive: true,
      color: "rgba(255,255,255, 1)",
    },
  };

  return (
    <Box>
      <Box sx={{ mt: { xs: "5px", md: "20px" } }}>
        <Container
          // Introduction section
          sx={{
            px: "20px",
            py: { xs: "20px", md: "20px" },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container>
            {/* Text */}
            <Typography
              fontSize={{ xs: "2rem", md: "2.5rem", lg: "2.8rem" }}
              fontWeight={600}
              color={"#202020"}
              textAlign={{ xs: "center" }}
            >
              Cryptocurrency market insights and news delivered to you
            </Typography>
            <Typography
              fontSize={{ xs: 16, sm: 18, lg: 20 }}
              color={"#202020"}
              mt={2}
              mb={3}
              textAlign={{ xs: "center" }}
            >
              Welcome to your briefing of the day
            </Typography>
          </Container>
          <Container
            sx={{
              width: { xs: "80%", lg: "100%" },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={image} style={{ width: "100%", borderRadius: "10px" }} />
          </Container>
        </Container>
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Selectcoin scrollRef={scrollRef} />
        </Container>
        <Box>
          {displayChartType ? (
            <PriceBarChart
              ref={scrollRef}
              displayChartType={displayChartType}
              setDisplayChartType={setDisplayChartType}
              currentPrice={currentPrice}
              currentMarketCap={currentMarketCap}
              currentDays={currentDays}
              capitalizedCoin={capitalizedCoin}
              avgPrice={avgPrice}
              loaded={coinDataLoaded}
              priceBarChartData={priceBarChartData}
              marketCapDifference={marketCapDifference}
              volumeDifference={volumeDifference}
              lowestPrice={lowestPrice}
              highestPrice={highestPrice}
            />
          ) : (
            <MarketCapBarChart
              ref={scrollRef}
              displayChartType={displayChartType}
              setDisplayChartType={setDisplayChartType}
              currentPrice={currentPrice}
              currentMarketCap={currentMarketCap}
              currentDays={currentDays}
              capitalizedCoin={capitalizedCoin}
              avgPrice={avgPrice}
              loaded={coinDataLoaded}
              marketCapBarChartData={marketCapBarChartData}
              marketCapDifference={marketCapDifference}
              volumeDifference={volumeDifference}
              lowestPrice={lowestPrice}
              highestPrice={highestPrice}
            />
          )}
        </Box>
      </Box>
      <Box>
        {topTokensListData && (
          <TopTokensPieChart
            chartData={TopTokensPieChartData}
            displayData={topTokensListData}
          />
        )}
      </Box>
      <Box
        sx={{
          display: { lg: "block", xl: "flex" },
          my: "30px",
          winWidth: { xs: "300px", sm: "450px", md: "550px" },
        }}
      >
        <Box>
          <News
            newsData={newsData}
            loaded={newsDataLoaded}
            currentCoin={capitalizedCoin}
          />
        </Box>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            my: "15px",
          }}
        >
          <SelectOtherCoins scrollRef={scrollRef} />
        </Container>
      </Box>
    </Box>
  );
}
