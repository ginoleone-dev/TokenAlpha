import { Box, Container, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import Header from "./Header";
import image from "../Images/cryptoImage.jpeg";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import BarChart from "../Graphs/BarChart";
import Selectcoin from "./SelectCoin";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";
import PriceBarChart from "./PriceBarChart";

export default function Home() {
  // Redux
  const currentCoin = useSelector((state) => state.tokenInfo.value.coin);
  const currentDays = useSelector((state) => state.tokenInfo.value.days);
  //
  const [loaded, setLoaded] = useState(false);

  const capitalizedCoin =
    currentCoin.charAt(0).toUpperCase() + currentCoin.slice(1);

  const { data } = useQuery(["token", currentCoin], async () => {
    const res = await Axios.get(
      `https://api.coingecko.com/api/v3/coins/${currentCoin}/market_chart?vs_currency=usd&days=300&interval=daily`
    );
    setLoaded(true);
    return res.data;
  });

  // MarketCap

  const mkCapByDays = data?.market_caps?.slice(-currentDays)?.map((mkCap) => {
    return mkCap[1];
  });

  const lastMk = data?.market_caps?.slice(-currentDays)[currentDays - 1][1];

  const firstMk = data?.market_caps?.slice(-currentDays)[0][1];

  const marketCapDifference = (
    ((lastMk?.toFixed(2) - firstMk?.toFixed(2)) / lastMk?.toFixed(2)) *
    100
  )?.toFixed(2);

  // Volume

  const volumeByDays = data?.total_volumes
    ?.slice(-currentDays)
    ?.map((volume) => {
      return volume[1];
    });

  const lastVolume = data?.total_volumes?.slice(-currentDays)[
    currentDays - 1
  ][1];

  const firstVolume = data?.total_volumes?.slice(-currentDays)[0][1];

  const volumeDifference = (
    ((lastVolume?.toFixed(2) - firstVolume?.toFixed(2)) /
      lastVolume?.toFixed(2)) *
    100
  )?.toFixed(2);

  // Data.prices gives an array of tuples the contain a timestamp for the day and the price, same for mkcap and volume.
  const pricesLast1Year = data?.prices?.slice(-currentDays)?.map((price) => {
    return price[1];
  });

  const datesLast1Year = data?.prices?.slice(-currentDays)?.map((timestamp) => {
    return new Date(timestamp[0]).getDate();
  });

  const avgPrice = (
    pricesLast1Year?.reduce((sum, currentPrice) => sum + currentPrice) /
    currentDays
  )?.toFixed(2);

  

  const lowestPrice = (pricesLast1Year?.reduce((sum, currentPrice) => Math.min(sum, currentPrice)))?.toFixed(2)

   const highestPrice = (pricesLast1Year?.reduce((sum, currentPrice) => Math.max(sum, currentPrice)))?.toFixed(2)
 





  // Charting

  const barChartData = {
    labels: datesLast1Year,
    datasets: [
      {
        label: `Price of ${capitalizedCoin} Last ${currentDays} days (in USD)`,
        data: pricesLast1Year,
        backgroundColor: ["#D6D6D6"],
        color: "#D6D6D6",
        tension: 0,
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



  return (
    <Box>
      <Container sx={{mt:'20px'}} >
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
              fontSize={{ xs: "2rem", md: "2.5rem", lg: "3rem" }}
              fontWeight={600}
              color={"#202020"}
              textAlign={{ xs: "center" }}
            >
              Cryptocurrency market insights{" "}
              <span style={{ color: "black" }}>delivered to you</span>
            </Typography>
            <Typography
              fontSize={{ xs: 16, sm: 18 }}
              color={"#202020"}
              mt={2}
              mb={3}
              textAlign={{ xs: "center" }}
            >
              Welcome to your briefing of the day
            </Typography>
          </Container>
          <Container sx={{ width: {xs:'80%', lg:'100%'}, display:'flex', justifyContent:'center' }}>
            <img src={image} style={{ width: "100%",  borderRadius: "10px" }} />
          </Container>
        </Container>
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Selectcoin />
          </Container>
          <PriceBarChart currentDays={currentDays} capitalizedCoin={capitalizedCoin} avgPrice = {avgPrice} loaded={loaded} barChartData={barChartData} marketCapDifference={marketCapDifference} volumeDifference={volumeDifference} lowestPrice={lowestPrice} highestPrice={highestPrice}/>
      </Container>
    </Box>
  );
}
