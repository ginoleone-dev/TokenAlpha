import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Autocomplete, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import "./select.css";
import { setTokenAndDay } from "../ReduxContext/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function SelectCoin({ scrollRef }) {
  // Redux
  const dispatch = useDispatch();

  const scrollToRef = () =>
    scrollRef.current.scrollIntoView({ behavior: "smooth" });

  const fetchTokenIdList = async () => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false`
    );
    return res.data.map((coin) => {
      return coin.id;
    });
  };

  const fetchTokenNameList = async () => {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false`
    );
    return res.data;
  };

  // const { data: generalTokenList } = useQuery(["tokenId"], fetchTokenNameList);

  const { data: tokenIdList } = useQuery(["tokenId"], fetchTokenIdList);

  // State
  const [coinDay, setCoinDay] = useState({
    coin: null,
    days: "",
    coinId: null,
  });

  const [isInputFilled, setIsInputFilled] = useState({
    coin: false,
    days: false,
  });
  // Data for autocomplete

  // Event Handler
  const handleCoinChange = (e) => {
    setCoinDay((values) => {
      return { ...values, [e.target.name]: e.target.value };
    });
    setIsInputFilled((values) => {
      return { ...values, [e.target.name]: true };
    });
  };

  const daysArray = [5, 10, 15, 20, 30, 50, 80, 100, 150, 200];

  return (
    <Container>
      <Typography
        textAlign={"center"}
        marginTop={{ xs: "30px", md: "50px" }}
        fontSize={20}
      >
        Select a token
      </Typography>
      <form>
        <Container
          style={{
            marginBottom: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "400px",
            flexDirection: "row",
          }}
        >
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              maxWidth: "300px",
            }}
          >
            <InputLabel id="demo-simple-select-autowidth-label">
              Token
            </InputLabel>
            {tokenIdList && (
              <Autocomplete
                options={tokenIdList}
                value={coinDay.coin}
                name={"coin"}
                onChange={(e, newCoin) =>
                  setCoinDay((values) => {
                    return { ...values, coin: newCoin };
                  })
                }
                onInputChange={(e, input) =>
                  setIsInputFilled((values) => {
                    return { ...values, coin: true };
                  })
                }
                sx={{ minWidth: "200px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name={"coin"}
                    sx={{
                      "& .MuiInputLabel-shrink ": {
                        display: "none",
                      },
                    }}
                  />
                )}
              />
            )}
          </Container>

          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              maxWidth: "300px",
              my: "12px",
            }}
          >
            <InputLabel id="demo-simple-select-autowidth-label">
              Days
            </InputLabel>
            <Select
              className="muiSelect"
              name="days"
              onChange={handleCoinChange}
              value={coinDay.days}
              autoWidth
              required
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
                "& .MuiInputLabel-shrink ": {
                  color: "black",
                },
                minWidth: "100px",
              }}
            >
              {daysArray.map((number, i) => {
                return (
                  <MenuItem key={i} value={number}>
                    {number}
                  </MenuItem>
                );
              })}
            </Select>
          </Container>
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            maxWidth: "310px",
            mb: 8,
          }}
        >
          <Button
            disabled={(isInputFilled.coin && isInputFilled.days) === false}
            onClick={() => {
              dispatch(
                setTokenAndDay({ coin: coinDay.coin, days: coinDay.days })
              );
              scrollToRef();
            }}
            variant={"contained"}
            sx={{
              backgroundColor: "#202020",
              minWidth: { xs: "150px", sm: "310px" },
              "&:hover": {
                backgroundColor: "#FFD100",
                color: "#202020",
              },
            }}
          >
            Run
          </Button>
        </Container>
      </form>
    </Container>
  );
}
