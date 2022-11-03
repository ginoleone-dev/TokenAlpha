import { Box, Button, Container, Typography } from "@mui/material";
import { forwardRef } from "react";
import BarChart from "../Graphs/BarChart";
import TokenStats from "./TokenStats";

export default forwardRef(function PriceBarChart(
  {
    displayChartType,
    setDisplayChartType,
    currentPrice,
    currentMarketCap,
    currentDays,
    capitalizedCoin,
    avgPrice,
    loaded,
    marketCapBarChartData,
    marketCapDifference,
    volumeDifference,
    lowestPrice,
    highestPrice,
  },
  ref
) {
  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: { xs: "column", lg: "row" },
        backgroundColor: "#333533",
        p: "30px 10px",
      }}
    >
      <Container
        sx={{
          maxWidth: {
            xs: "390px",
            sm: "700px",
            md: "750px",
            lg: "900px",
            xl: "1000px",
          },

          border: "2px solid black",
          borderRadius: "25px",
          p: "10px 30px",
          backgroundColor: "#202020",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography fontSize={{ xs: 24, sm: 28 }} color={"#D6D6D6"}>
            Market Cap Activity
          </Typography>
          {displayChartType ? (
            <Button
              sx={{ color: "white" }}
              onClick={() => setDisplayChartType((prevValue) => !prevValue)}
            >
              Display Market Cap
            </Button>
          ) : (
            <Button
              sx={{ color: "white" }}
              onClick={() => setDisplayChartType((prevValue) => !prevValue)}
            >
              Display Price Action
            </Button>
          )}
        </Box>

        <Typography fontSize={{ xs: 15, sm: 25 }} color={"#D6D6D6"}>
          Here is the activity of the market cap for the last {currentDays} days
          for {capitalizedCoin}
        </Typography>
        {loaded && <BarChart chartData={marketCapBarChartData} />}
        <Typography marginTop={2} fontSize={10} color={"white"}>
          Data provided by CoinGecko API
        </Typography>
      </Container>
      <TokenStats
        currentPrice={currentPrice}
        currentMarketCap={currentMarketCap}
        avgPrice={avgPrice}
        marketCapDifference={marketCapDifference}
        volumeDifference={volumeDifference}
        lowestPrice={lowestPrice}
        highestPrice={highestPrice}
      />
    </Box>
  );
});
