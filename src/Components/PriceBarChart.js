import { Box, Container, Typography } from "@mui/material";
import BarChart from "../Graphs/BarChart";

export default function PriceBarChart({
  currentDays,
  capitalizedCoin,
  avgPrice,
  loaded,
  barChartData,
  marketCapDifference,
  volumeDifference,
  lowestPrice,
  highestPrice,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: { xs: "column", lg: "row" },
        backgroundColor: "#333533",
        p: "50px 20px",
        mt: "20px",
        mb: "20px",
      }}
    >
      <Container
        sx={{
          maxWidth: {
            xs: "400px",
            sm: "700px",
            md: "900px",
            lg: "1000px",
            xl: "1200px",
          },

          border: "2px solid black",
          borderRadius: "25px",
          p: "10px 30px",
          backgroundColor: "#202020",
        }}
      >
        <Typography fontSize={{ xs: 24, sm: 28 }} color={"#D6D6D6"}>
          Price Action
        </Typography>

        <Typography fontSize={{ xs: 15, sm: 25 }} color={"#D6D6D6"}>
          Here is the price action of the last {currentDays} days for{" "}
          {capitalizedCoin}
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
          marginTop: { xs: "20px", md: "0px" },
        }}
      >
        <Container
          sx={{
            maxWidth: { xs: "90%" },
            backgroundColor: "#202020",
            color: "white",
            p: "10px 20px",
            borderRadius: "20px",
            marginTop: { xs: "20px" },
          }}
        >
          <Typography fontSize={{ xs: 20, md: 22 }} textAlign={"center"}>
            Average Price for the last {currentDays} days:{" "}
          </Typography>
          <Typography
            fontSize={23}
            textAlign={"center"}
            fontWeight={600}
            color={"#FFD100"}
          >
            ${avgPrice}
          </Typography>
        </Container>
        <Container
          sx={{
            maxWidth: { xs: "90%" },
            backgroundColor: "#202020",
            color: "white",
            mt: "20px",
            p: "10px 20px",
            borderRadius: "20px",
          }}
        >
          <Typography fontSize={{ xs: 20, md: 22 }} textAlign={"center"}>
            Market Cap change for the last {currentDays} days:{" "}
          </Typography>
          <Typography
            fontSize={{ xs: 23 }}
            textAlign={"center"}
            fontWeight={600}
            color={"#FFD100"}
          >
            {marketCapDifference}%
          </Typography>
        </Container>
        <Container
          sx={{
            maxWidth: { xs: "90%" },
            backgroundColor: "#202020",
            color: "white",
            p: "10px 20px",
            borderRadius: "20px",
            marginTop: { xs: "20px" },
          }}
        >
          <Typography fontSize={{ xs: 20, md: 22 }} textAlign={"center"}>
            Volume change for the last {currentDays} days:{" "}
          </Typography>
          <Typography
            fontSize={23}
            textAlign={"center"}
            fontWeight={600}
            color={"#FFD100"}
          >
            {volumeDifference}%
          </Typography>
        </Container>

        <Container
          sx={{
            maxWidth: { xs: "90%" },
            backgroundColor: "#202020",
            color: "white",
            p: "10px 20px",
            borderRadius: "20px",
            marginTop: { xs: "20px" },
          }}
        >
          <Typography fontSize={{ xs: 20, md: 22 }} textAlign={"center"}>
            Lowest and highest price for the last {currentDays} days
          </Typography>
          <Typography
            fontSize={20}
            textAlign={"center"}
            fontWeight={600}
            color={"#FFD100"}
          >
            Low: ${lowestPrice}
          </Typography>
          <Typography
            fontSize={20}
            textAlign={"center"}
            fontWeight={600}
            color={"#FFD100"}
          >
            High: ${highestPrice}
          </Typography>
        </Container>
      </Container>
    </Box>
  );
}
