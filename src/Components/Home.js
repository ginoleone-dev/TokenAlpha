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

  const newAvgPrice = (
    pricesLast1Year?.reduce((sum, currentPrice) => sum + currentPrice) /
    currentDays
  ).toFixed(2);

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

  console.log(data);

  return (
    <Box>
      <Container>
        <Container
          // Introduction section
          sx={{
            px: "20px",
            py: { xs: "20px", md: "60px" },
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
          <Container sx={{ width: "100%" }}>
            <img src={image} style={{ width: "100%", borderRadius: "10px" }} />
          </Container>
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            mb: "15px",
          }}
        >
          <Typography textAlign={"center"} my={2} fontSize={20}>
            Select the token you want to analize
          </Typography>
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Selectcoin />
          </Container>
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column", lg: "row" },
            backgroundColor: "#333533",
            borderRadius: "20px",
            p: "40px 40px",
            mt: "20px",
            mb: "20px",
            width: {
              xs: "380px",
              sm: "600px",
              md: "800px",
              lg: "1400px",
              xl: "1600px",
            },
          }}
        >
          <Container
            sx={{
              minWidth: { xs: "340px", sm: "450px", md: "700px" },
              mx: "20px",
              border: "2px solid black",
              borderRadius: "25px",
              p: "10px 20px",
              backgroundColor: "#202020",
            }}
          >
            <Box>
              <Typography fontSize={{ xs: 24, sm: 28 }} color={"#D6D6D6"}>
                Price Action
              </Typography>
            </Box>
            <Typography fontSize={{ xs: 15, sm: 25 }} color={"#D6D6D6"}>
              Here is the price action of the last {currentDays} days for{" "}
              {capitalizedCoin} with an average price of ${newAvgPrice}
            </Typography>
            {loaded && <BarChart chartData={barChartData} />}
            <Typography marginTop={2} fontSize={10} color={"white"}>
              Data provided by CoinGecko API
            </Typography>
          </Container>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Container
              sx={{
                maxWidth: { xs: "350px" },
                backgroundColor: "#202020",
                color: "white",
                my: "10px",
                p: "10px 20px",
                borderRadius: "20px",
              }}
            >
              <Typography fontSize={{ xs: 20, md: 25 }} textAlign={"center"}>
                Market Cap change in the last {currentDays} days:{" "}
              </Typography>
              <Typography
                fontSize={{ xs: 25 }}
                textAlign={"center"}
                fontWeight={600}
                color={"#FFD100"}
              >
                {marketCapDifference}%
              </Typography>
            </Container>
            <Container
              sx={{
                maxWidth: { xs: "350px" },
                backgroundColor: "#202020",
                color: "white",
                my: "10px",
                p: "10px 20px",
                borderRadius: "20px",
              }}
            >
              <Typography fontSize={{ xs: 28, md: 30 }} textAlign={"center"}>
                Volume change in the last {currentDays} days:{" "}
              </Typography>
              <Typography
                fontSize={25}
                textAlign={"center"}
                fontWeight={600}
                color={"#FFD100"}
              >
                {volumeDifference}%
              </Typography>
            </Container>
          </Container>
        </Container>
      </Container>
    </Box>
  );
}
