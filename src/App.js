import React, { useState } from "react";
import { Box, SvgIcon, Typography } from "@mui/material";
import Search from "./components/Search/Search";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import TodayWeather from "./components/TodayWeather/TodayWeather";
import { fetchWeatherData } from "./api/OpenWeatherService";
import { transformDateFormat } from "./utilities/DatetimeUtils";
import ISTDatetime from "./components/Reusable/ISTDatetime";
import LoadingBox from "./components/Reusable/LoadingBox";
import { ReactComponent as SplashIcon } from "./assets/splash-icon.svg";
import Logo from "./assets/logo.png";
import ErrorBox from "./components/Reusable/ErrorBox";
import { ALL_DESCRIPTIONS } from "./utilities/DateConstants";

import {
  getTodayForecastWeather,
  getWeekForecastWeather,
} from "./utilities/DataUtils";

function App() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [temperatureUnit, setTemperatureUnit] = useState("metric");

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (temperatureUnit === "metric") {
      setTemperatureUnit("imperial");
    } else if (temperatureUnit === "imperial") {
      setTemperatureUnit("metric");
    }
  };

  const searchChangeHandler = async (enteredData) => {
    const [latitude, longitude] = enteredData.value.split(" ");

    setIsLoading(true);

    const currentDate = transformDateFormat();
    const date = new Date();
    let dt_now = Math.floor(date.getTime() / 1000);

    try {
      const [todayWeatherResponse, weekForecastResponse] =
        await fetchWeatherData(latitude, longitude, temperatureUnit);
      const all_today_forecasts_list = getTodayForecastWeather(
        weekForecastResponse,
        currentDate,
        dt_now,
        temperatureUnit
      );

      const all_week_forecasts_list = getWeekForecastWeather(
        weekForecastResponse,
        ALL_DESCRIPTIONS
      );

      setTodayForecast([...all_today_forecasts_list]);
      setTodayWeather({ city: enteredData.label, ...todayWeatherResponse });
      setWeekForecast({
        city: enteredData.label,
        list: all_week_forecasts_list,
      });
    } catch (error) {
      setError(true);
    }

    setIsLoading(false);
  };

  let appContent = (
    <Box
      xs={12}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        minHeight: "500px",
      }}
    >
      <SvgIcon
        component={SplashIcon}
        inheritViewBox
        sx={{ fontSize: { xs: "100px", sm: "120px", md: "140px" } }}
      />
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: "12px", sm: "14px" },
          color: "rgba(255,255,255, .85)",
          fontFamily: "Poppins",
          textAlign: "center",
          margin: "2rem 0",
          maxWidth: "80%",
          lineHeight: "22px",
        }}
      >
        Explore current weather data and 6-day forecast of more than 200,000
        cities!
      </Typography>
    </Box>
  );

  if (todayWeather && todayForecast && weekForecast) {
    appContent = (
      <div
        className={`grid gap-5 xs:grid-cols-1 sm:grid-cols-1 ${
          todayWeather ? "md:grid-cols-2" : "md:grid-cols-1"
        } lg:p-10 sm:p-5 xs:p-5`}
      >
        <div>
          <TodayWeather
            data={todayWeather}
            forecastList={todayForecast}
            temperatureUnit={temperatureUnit}
          />
        </div>
        <div>
          <WeeklyForecast
            data={weekForecast}
            temperatureUnit={temperatureUnit}
          />
        </div>
      </div>
    );
  }

  if (error) {
    appContent = (
      <ErrorBox
        margin="3rem auto"
        flex="inherit"
        errorMessage="Something went wrong"
      />
    );
  }

  if (isLoading) {
    appContent = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "500px",
        }}
      >
        <LoadingBox value="1">
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: "10px", sm: "12px" },
              color: "rgba(255, 255, 255, .8)",
              lineHeight: 1,
              fontFamily: "Poppins",
            }}
          >
            Loading...
          </Typography>
        </LoadingBox>
      </Box>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between items-center sm:py-2 sm:px-10 xs:py-4 xs:px-8 lg:py-4 lg:px-20 ">
        <img
          className="xs:h-[46px] sm:h-[46px] md:h-[70px] h-[90px]"
          alt="logo"
          src={Logo}
        />
        <Search onSearchChange={searchChangeHandler} />
        <label className="themeSwitcherThree fixed top-20 right-10 inline-flex cursor-pointer select-none items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />

          <div className="shadow-card flex h-[46px] w-[82px] items-center justify-center rounded-md bg-white">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded ${
                !isChecked
                  ? "bg-[#8ec5fc] bg-[linear-gradient(62deg,#8ec5fc_0%,#e0c3fc_100%)] text-white"
                  : "text-body-color"
              }`}
            >
              C
            </span>
            <span
              className={`flex h-9 w-9 items-center justify-center rounded ${
                isChecked
                  ? "bg-[#8ec5fc] bg-[linear-gradient(62deg,#8ec5fc_0%,#e0c3fc_100%)] text-white"
                  : "text-body-color"
              }`}
            >
              F
            </span>
          </div>
        </label>
        <ISTDatetime />
      </div>
      {appContent}
    </div>
  );
}

export default App;
