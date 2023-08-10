import moment from "moment";
import "moment/locale/es";
import CloudFillIcon from "remixicon-react/CloudFillIcon";
import DropFillIcon from "remixicon-react/DropFillIcon";
import WindyLineIcon from "remixicon-react/WindyLineIcon";
import TempColdLineIcon from "remixicon-react/TempColdLineIcon";
import MapPinLineIcon from "remixicon-react/MapPinLineIcon";
import {
    WeatherMain,
    WeatherTemperature,
    WeatherTextData,
    WeatherData,
    WeatherDataItem,
    WeatherDataDescription,
} from "../styled-components/WeatherComponents";

export const WeatherContainer = ({
    data: { name, sys, clouds, main, wind, dt },
}) => {
    moment.locale("es");
    return (
        <>
            <WeatherMain>
                <WeatherTemperature>
                    {Math.round(main.temp)}
                    {String.fromCharCode(176)} C
                </WeatherTemperature>
                <WeatherTextData>
                    <MapPinLineIcon size="16px" /> {name}, {sys.country}
                </WeatherTextData>
            </WeatherMain>
            <WeatherData>
                <WeatherDataItem>
                    <CloudFillIcon size="15px" />
                    <WeatherDataDescription>
                        {clouds.all}%
                    </WeatherDataDescription>
                </WeatherDataItem>
                <WeatherDataItem>
                    <DropFillIcon size="15px" />
                    <WeatherDataDescription>
                        {main.humidity}%
                    </WeatherDataDescription>
                </WeatherDataItem>
                <WeatherDataItem>
                    <WindyLineIcon size="15px" />
                    <WeatherDataDescription>
                        {wind.speed} km/h
                    </WeatherDataDescription>
                </WeatherDataItem>
                <WeatherDataItem>
                    <TempColdLineIcon size="15px" />
                    <WeatherDataDescription>
                        {Math.round(main.temp_max)}
                        {String.fromCharCode(176)}
                    </WeatherDataDescription>
                </WeatherDataItem>
            </WeatherData>
            <p>
                Ultima actualización:{" "}
                {moment(moment(moment.unix(dt)["_i"]).format()).fromNow()}
            </p>
        </>
    );
};
