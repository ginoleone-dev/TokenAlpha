import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import "./select.css";
import { setTokenAndDay } from "../ReduxContext/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function SelectCoin({ percent }) {
  // Redux
  const dispatch = useDispatch();

  // Redux
  const [coinDay, setCoinDay] = useState({
    coin: "",
    days: "",
  });

  const handleCoinChange = (e) => {
    setCoinDay((values) => {
      return { ...values, [e.target.name]: e.target.value };
    });
  };

  return (
    <Container>
      <Typography textAlign={"center"} my={2} fontSize={20}>
        Select the token you want to analize
      </Typography>
      <Container
        style={{
          marginBottom: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "400px",
          flexDirection: "column",
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
          <InputLabel id="demo-simple-select-autowidth-label">Token</InputLabel>
          <Select
            className="muiSelect"
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            name="coin"
            value={coinDay.coin}
            onChange={handleCoinChange}
            autoWidth
            label="Token"
            sx={{
              "& .MuiInputBase-input": {
                border: "1px solid black",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
              },
              "& .MuiInputLabel-shrink ": {
                color: "black",
              },
              minWidth: "100px",
            }}
          >
            <MenuItem value={"bitcoin"}>Bitcoin</MenuItem>
            <MenuItem value={"ethereum"}>Ethereum</MenuItem>
            <MenuItem value={"cardano"}>Cardano</MenuItem>
            <MenuItem value={"tether"}>Tether</MenuItem>
            <MenuItem value={"avalanche-2"}>Avalanche</MenuItem>
            <MenuItem value={"ripple"}>XRP</MenuItem>
            <MenuItem value={"binancecoin"}>BNB</MenuItem>
          </Select>
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
          <InputLabel id="demo-simple-select-autowidth-label">Days</InputLabel>
          <Select
            className="muiSelect"
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            name="days"
            onChange={handleCoinChange}
            value={coinDay.days}
            autoWidth
            label="Token"
            sx={{
              "& .MuiInputBase-input": {
                border: "1px solid black",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
              },
              "& .MuiInputLabel-shrink ": {
                color: "black",
              },
              minWidth: "100px",
            }}
          >
            <MenuItem value={5}>5 days</MenuItem>
            <MenuItem value={10}>10 days</MenuItem>
            <MenuItem value={20}>20 days</MenuItem>
            <MenuItem value={50}>50 days</MenuItem>
            <MenuItem value={100}>100 days</MenuItem>
            <MenuItem value={150}>150 days</MenuItem>
            <MenuItem value={200}>200 days</MenuItem>
            <MenuItem value={250}>250 days</MenuItem>
            <MenuItem value={300}>300 days</MenuItem>
          </Select>
        </Container>
        <Button
          onClick={() =>
            dispatch(setTokenAndDay({ coin: coinDay.coin, days: coinDay.days }))
          }
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
          Run
        </Button>
      </Container>
    </Container>
  );
}
