import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import Header from "./Header";
import apiImage from "../Images/api-visual.png";
import apiUrl from "../Images/apiUrl.PNG";

export default function About() {
  const responsiveStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "24px",
    flexDirection: "column",
  };

  const imageStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "24px",
    flexDirection: "row",
  };
  return (
    <Container sx={responsiveStyle}>
      <Container>
        <Typography fontSize={23} marginTop={"10px"}>
          TokenAlpha
        </Typography>
        <Typography fontSize={17}>
          This project is a showcase of API usage, it is made with the{" "}
          <a
            href="https://www.coingecko.com/en/api"
            target="blank"
            style={{ color: "#202020", cursor: "pointer" }}
          >
            CoinGecko API
          </a>{" "}
          and the{" "}
          <a
            href="https://gnews.io/"
            target="blank"
            style={{ color: "#202020", cursor: "pointer" }}
          >
            GNews API
          </a>
          . The goal is to dynamically change what the user wants to see, this
          is achieved by customizing the queries about a token and passing it to
          the 2 APIs. This information will be processed and displayed on the
          screen.
        </Typography>
        <Typography fontSize={23} marginTop={3}>
          Charts made with Chart.js
        </Typography>
        <Typography fontSize={17}>
          Responsive charts that display price information to the user
          dynamically in a responsive manner.
        </Typography>
        <Typography fontSize={23} marginTop={3}>
          Data fetching and updating with React-Query
        </Typography>
        <Typography fontSize={17}>
          React-Query was used because it simplifies server side state with
          features like cache updating and re-using already fetched data on
          multiple components with the useQuery hook.
        </Typography>
        <Typography fontSize={23} marginTop={3}>
          Global state management with Redux Toolkit
        </Typography>
        <Typography fontSize={17}>
          There are 2 (local) global variables (current coin and current number
          of days) that the user selects and change throughout every component
          that might need this information to avoid prop drilling.
        </Typography>
      </Container>
      <Container style={imageStyle}>
        <img
          src={apiImage}
          style={{ width: "70%", borderRadius: "10px", marginTop: "10px" }}
        />
      </Container>
      <Container sx={{ mt: "20px", display: "flex", justifyContent: "end" }}>
        <Button
          href="https://leonedevelopment.io/"
          target="_blank"
          variant={"contained"}
          sx={{
            backgroundColor: "#202020",
            my: "14px",
            "&:hover": {
              backgroundColor: "#FFD100",
              color: "#202020",
            },
          }}
        >
          Back to portfolio
        </Button>
      </Container>
    </Container>
  );
}
