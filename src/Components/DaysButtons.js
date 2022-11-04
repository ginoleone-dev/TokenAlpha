import { Box, Button, Container } from "@mui/material";
import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { setOnlyDays } from "../ReduxContext/store";
export default function () {
  const dispatch = useDispatch();
  const daysList = [5, 10, 30, 90, 180];

  return (
    <Box sx={{ display: "flex", mt: "1.5rem", gap: 0.5 }}>
      {daysList.map((day) => {
        return (
          <Button
            sx={{
              backgroundColor: "#D6D6D6",
              "&:hover": { backgroundColor: "#E9EAEC" },
              maxHeight: "30px",
              fontSize: { xs: "0.8rem", md: "1rem" },
            }}
            onClick={() => dispatch(setOnlyDays(day))}
          >
            {day}d
          </Button>
        );
      })}
    </Box>
  );
}
