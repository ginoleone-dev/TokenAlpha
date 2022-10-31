import { Container, styled, Typography } from "@mui/material";
import React from "react";
import { theme } from "../theme";

export default function News({ newsData, loaded, currentCoin }) {
  const OuterContainer = styled(Container)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    minWidth: "600px",

    marginBottom: "80px",

    [theme.breakpoints.down("sm")]: {
      minWidth: "400px",
    },
    [theme.breakpoints.up("md")]: {
      minWidth: "700px",
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: "800px",
    },
  });

  const InnerContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100px",
    paddingTop: "20px",
    paddingBottom: "5px",
    borderBottom: "1px solid gray",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "450px",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "700px",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "800px",
    },
  }));

  const TitleContainer = styled(Container)(({ theme }) => ({
    width: "800px",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  }));

  const NewsTitle = styled(Typography)(({ theme }) => ({
    fontSize: "1.4rem",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" },
    [theme.breakpoints.down("md")]: {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  }));

  const imageStyle = {
    maxWidth: "140px",
  };

  if (newsData) {
    return (
      <>
        <Typography textAlign={"center"} fontSize={{ xs: "28px", md: "35px" }}>
          Latest {currentCoin} news
        </Typography>
        <OuterContainer>
          {newsData?.map((news, i) => (
            <InnerContainer key={i}>
              <TitleContainer>
                <NewsTitle>
                  <a
                    href={news.url}
                    target="_blank"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {news.title} - ({news.source.name})
                  </a>
                </NewsTitle>
              </TitleContainer>

              <a href={news.url} target="_blank">
                <img src={news.image} style={imageStyle} />
              </a>
            </InnerContainer>
          ))}
        </OuterContainer>
      </>
    );
  } else {
    return <div></div>;
  }
}
