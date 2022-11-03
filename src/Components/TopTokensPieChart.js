import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import PieChart from "../Graphs/PieChart";

export default function TopTokensPieChart({ chartData, displayData }) {
  console.log(displayData);
  return (
    <>
      <Typography
        textAlign={"center"}
        color={"white"}
        fontSize={{ xs: 25, sm: 27 }}
        backgroundColor={"#202020"}
        pt={3}
      >
        Top tokens by market cap
      </Typography>
      <Box
        sx={{
          backgroundColor: "#202020",
          p: "20px 0px",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          gap: { xs: 0, md: 4, lg: 10 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ width: { xs: "350px", sm: "360", md: "450px" } }}>
            <PieChart chartData={chartData} />
          </Box>
        </Box>
        <Box
          sx={{
            paddingY: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            {displayData?.map((token) => {
              return (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      gap: { xs: 3, sm: 4 },
                      marginRight: "10px",
                    }}
                  >
                    <Box>
                      <Typography
                        color={"white"}
                        fontSize={{ xs: 16, sm: 16, md: 20, lg: 24 }}
                      >
                        {token.market_cap_rank}. {token.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        color={"white"}
                        fontSize={{ xs: 16, sm: 16, md: 20, lg: 24 }}
                      >
                        ${token.market_cap}
                      </Typography>
                    </Box>
                  </Box>
                </>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}
