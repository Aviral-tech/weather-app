import { Grid } from "@mui/material";
import React from "react";
import AirConditions from "./AirConditions/AirConditions";
import DailyForecast from "./Forecast/DailyForecast";
import Details from "./Details/Details";

const TodayWeather = ({ data, forecastList, temperatureUnit }) => {
  return (
    <div className="p-[3rem] rounded-2xl bg-[#365486] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
      <Details data={data} temperatureUnit={temperatureUnit} />
      <AirConditions data={data} temperatureUnit={temperatureUnit} />
      <DailyForecast
        data={data}
        forecastList={forecastList}
        temperatureUnit={temperatureUnit}
      />
    </div>
  );
};

export default TodayWeather;
