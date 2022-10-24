import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Box, Container, styled, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setTokenAndDay } from "../ReduxContext/store";

export default function SelectOtherCoins() {
  // Redux
  const dispatch = useDispatch();

  const fetchTrendingCoins = async () => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/search/trending`
    );
    return res.data;
  };

  const { data } = useQuery(["popularToken"], fetchTrendingCoins);

  const OuterContainer = styled(Container)({
    minWidth: "300px",
    maxWidth: "700px",
    backgroundColor: "#202020",
    padding: "10px 20px",
    borderRadius: "20px",
  });

  const CenteredColumnContainer = styled(Container)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  });
  const CenteredRowContainer = styled(Container)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: "20px",
    paddingBottom: "5px",
  });

  const TrendingTitle = styled(Typography)(({ theme }) => ({
    fontSize: "1.4rem",
    fontWeight: "bold",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  }));

  const imageStyle = {
    maxWidth: "40px",
  };

  return (
    <Box
      sx={{ minWidth: { xs: "300px", sm: "400px", md: "550px", lg: "600px" } }}
    >
      <OuterContainer>
        <TrendingTitle
          style={{ textAlign: "center", fontSize: "30px", color: "white" }}
        >
          Trending Tokens
        </TrendingTitle>
        <Typography
          style={{ textAlign: "center", fontSize: "15px", color: "white" }}
        >
          Click a token to analize it!
        </Typography>
        <CenteredColumnContainer>
          {data?.coins?.map((coin, i) => (
            <CenteredRowContainer key={i}>
              <CenteredColumnContainer>
                <Typography
                  name={coin?.item?.name}
                  value={coin?.item?.id}
                  onClick={() =>
                    dispatch(setTokenAndDay({ coin: coin?.item?.id, days: 20 }))
                  }
                  sx={{
                    fontSize: "18px",
                    textAlign: "center",
                    color: "white",
                    minWidth: "100px",
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {coin?.item?.name} ({coin?.item?.symbol})
                </Typography>
              </CenteredColumnContainer>
              <CenteredColumnContainer>
                <img
                  src={coin?.item?.small}
                  alt={"token image"}
                  style={imageStyle}
                />
              </CenteredColumnContainer>
            </CenteredRowContainer>
          ))}
        </CenteredColumnContainer>
      </OuterContainer>
    </Box>
  );
}
