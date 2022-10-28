import { Box, Button, Container, Typography } from "@mui/material";
import { forwardRef } from "react";
import BarChart from "../Graphs/BarChart";

export default forwardRef(function PriceBarChart(
  {
    displayChartType,
    setDisplayChartType,
    currentDays,
    capitalizedCoin,
    avgPrice,
    loaded,
    priceBarChartData,
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
        p: "50px 20px",
        mb: "20px",
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
            Price Action
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
          Here is the price action of the last {currentDays} days for{" "}
          {capitalizedCoin}
        </Typography>
        {loaded && <BarChart chartData={priceBarChartData} />}
        <Typography marginTop={2} fontSize={10} color={"white"}>
          Data provided by CoinGecko API
        </Typography>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: { xs: "20px", md: "0px" },
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 3,
            color: "white",
            p: "10px 20px",
            marginTop: { xs: "20px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              minHeight: "150px",
              backgroundColor: "#202020",
              color: "white",
              borderRadius: "12px",
            }}
          >
            <Typography fontSize={{ xs: 16, md: 22 }} textAlign={"center"}>
              Average Price
            </Typography>
            <Typography
              fontSize={{ xs: 18, md: 20 }}
              textAlign={"center"}
              fontWeight={600}
              color={"#FFD100"}
            >
              ${avgPrice}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              minHeight: "150px",
              backgroundColor: "#202020",
              color: "white",
              borderRadius: "12px",
            }}
          >
            <Typography fontSize={{ xs: 16, md: 22 }} textAlign={"center"}>
              Market Cap change %
            </Typography>
            <Typography
              fontSize={{ xs: 18, md: 20 }}
              textAlign={"center"}
              fontWeight={600}
              color={"#FFD100"}
            >
              {marketCapDifference}%
            </Typography>
          </Box>
        </Container>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            minWidth: { xs: "100%" },
            color: "white",
            p: "10px 20px",
            marginTop: { xs: "20px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              minHeight: "150px",
              gap: 1,
              backgroundColor: "#202020",
              color: "white",
              borderRadius: "12px",
            }}
          >
            <Typography fontSize={{ xs: 16, md: 22 }} textAlign={"center"}>
              Volume change %
            </Typography>
            <Typography
              fontSize={{ xs: 18, md: 20 }}
              textAlign={"center"}
              fontWeight={600}
              color={"#FFD100"}
            >
              {volumeDifference}%
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              minHeight: "150px",
              gap: 1,
              backgroundColor: "#202020",
              color: "white",
              borderRadius: "12px",
            }}
          >
            <Typography fontSize={{ xs: 16, md: 22 }} textAlign={"center"}>
              Lowest and highest price
            </Typography>
            <Typography
              fontSize={{ xs: 18, md: 20 }}
              textAlign={"center"}
              fontWeight={600}
              color={"#FFD100"}
            >
              Low: ${lowestPrice}
            </Typography>
            <Typography
              fontSize={{ xs: 18, md: 20 }}
              textAlign={"center"}
              fontWeight={600}
              color={"#FFD100"}
            >
              High: ${highestPrice}
            </Typography>
          </Box>
        </Container>
      </Container>
    </Box>
  );
});
