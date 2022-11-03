import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function TokenStats({
  currentPrice,
  currentMarketCap,
  avgPrice,
  marketCapDifference,
  volumeDifference,
  lowestPrice,
  highestPrice,
}) {
  return (
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
          <Typography
            fontSize={{ xs: 16, sm: 20, md: 22 }}
            textAlign={"center"}
          >
            Price
          </Typography>
          <Typography
            fontSize={{ xs: 18, md: 20 }}
            textAlign={"center"}
            fontWeight={600}
            color={"#FFD100"}
          >
            ${currentPrice}
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
          <Typography
            fontSize={{ xs: 16, sm: 20, md: 22 }}
            textAlign={"center"}
          >
            Market Cap
          </Typography>
          <Typography
            fontSize={{ xs: 18, md: 20 }}
            textAlign={"center"}
            fontWeight={600}
            color={"#FFD100"}
          >
            ${currentMarketCap}
          </Typography>
        </Box>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 3,
          color: "white",
          p: "10px 20px",
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
          <Typography
            fontSize={{ xs: 16, sm: 20, md: 22 }}
            textAlign={"center"}
          >
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
          <Typography
            fontSize={{ xs: 16, sm: 20, md: 22 }}
            textAlign={"center"}
          >
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
          <Typography
            fontSize={{ xs: 16, sm: 20, md: 22 }}
            textAlign={"center"}
          >
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
          <Typography
            fontSize={{ xs: 16, sm: 20, md: 22 }}
            textAlign={"center"}
          >
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
  );
}
