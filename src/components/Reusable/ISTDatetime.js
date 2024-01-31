import { Typography } from "@mui/material";
import React from "react";
import { getISTDatetime } from "../../utilities/DatetimeUtils";

const ISTDatetime = () => {
  const istFullDate = getISTDatetime();
  const istTimeValue = (
    <Typography
      variant="h3"
      component="h3"
      sx={{
        fontWeight: "800",
        fontSize: { xs: "16px", sm: "18px" },
        color: "rgba(255, 255, 255, .7)",
        lineHeight: 1,
        paddingRight: "2px",
        fontFamily: "Poppins",
      }}
    >
      {istFullDate} IST
    </Typography>
  );
  return istTimeValue;
};

export default ISTDatetime;
