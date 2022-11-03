import { CardContent, Typography } from "@mui/material";
import { Card } from "material-ui";
import React from "react";

export default function HoverInfo(props) {
  return (
    <>
      <Card>
        <CardContent>
          <Typography>Props Text</Typography>
        </CardContent>
      </Card>
    </>
  );
}
