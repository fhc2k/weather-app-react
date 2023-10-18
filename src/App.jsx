import { useEffect, useState } from "react";
import {
    LayoutContainer,
    LayoutData,
    LayoutMain,
    LayoutSearcher,
} from "./styled-components/Layouts";
import { Form } from "./styled-components/Forms";
import {
    FieldText,
    FieldInputText,
    FieldRadioItem,
    FieldRadioGroup,
} from "./styled-components/FormsFields";
import { Button } from "./styled-components/Buttons";
import { fetchData } from "./services/service-weather";
import { Spinner } from "./styled-components/Spinner";
import SearchLineIcon from "remixicon-react/SearchLineIcon";
import { WeatherContainer } from "./components/WeatherContainer";
import { Message } from "./styled-components/Messages";

const App = () => {
    const initialWeatherInfo = {
        apiKey: null,
        inputs: {},
        data: null,
        isLoading: false,
        error: null,
        temp: null,
    };

    const [weatherInfo, setWeatherInfo] = useState(initialWeatherInfo);

    const convertUnits = (temp, unit) => {
        return unit === "imperial" ? temp * 1.8 + 32 : temp;
    };

    useEffect(() => {
        if (weatherInfo.data) {
            setWeatherInfo((prev) => ({
                ...prev,
                temp: convertUnits(
                    weatherInfo.data.main.temp,
                    weatherInfo.inputs.unit
                ),
            }));
        }
    }, [weatherInfo.inputs.unit, weatherInfo.data]);

    const handleChange = ({ target: { name, value } }) => {
        setWeatherInfo((prev) => ({
            ...prev,
            inputs: { ...prev.inputs, [name]: value },
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setWeatherInfo((prev) => ({ ...prev, isLoading: true }));

        try {
            const data = await fetchData(
                weatherInfo.inputs.location,
                "metric",
                weatherInfo.apiKey
            );
            setWeatherInfo((prev) => ({ ...prev, data, error: null }));
        } catch (error) {
            setWeatherInfo((prev) => ({ ...prev, data: null, error }));
        } finally {
            setWeatherInfo((prev) => ({
                ...prev,
                isLoading: false,
                inputs: { ...weatherInfo.inputs, location: "" },
            }));
        }
    };

    const handleSaveApiKey = (event) => {
        event.preventDefault();

        setWeatherInfo((prev) => ({ ...prev, apiKey: prev.inputs.apiKey }));
    };

    const handleGeolocation = () => {
        navigator.geolocation.getCurrentPosition(
            onLocationSuccess,
            onLocationError
        );
    };

    const onLocationSuccess = async (position) => {
        setWeatherInfo((prev) => ({ ...prev, isLoading: true }));

        try {
            const data = await fetchData(
                position.coords,
                "metric",
                weatherInfo.apiKey
            );
            setWeatherInfo((prev) => ({
                ...prev,
                data,
                error: null,
            }));
        } catch (error) {
            setWeatherInfo((prev) => ({ ...prev, data: null, error }));
        } finally {
            setWeatherInfo((prev) => ({ ...prev, isLoading: false }));
        }
    };

    const onLocationError = (error) => {
        setWeatherInfo((prev) => ({ ...prev, data: null, error }));
    };

    return (
        <LayoutContainer>
            {weatherInfo.apiKey ? (
                <LayoutMain>
                    <LayoutSearcher>
                        <Form onSubmit={handleSubmit}>
                            <FieldText>
                                <SearchLineIcon size="16px" color="#FFF" />
                                <FieldInputText
                                    type="text"
                                    value={weatherInfo.inputs.location || ""}
                                    onChange={handleChange}
                                    name="location"
                                    placeholder="Enter your location"
                                    required={true}
                                />
                            </FieldText>
                            <Button primary>Search</Button>
                        </Form>
                        <p>o</p>
                        <Button secondary onClick={handleGeolocation}>
                            Search by my location
                        </Button>
                        <FieldRadioGroup>
                            <FieldRadioItem>
                                <span>Celsius</span>
                                <input
                                    type="radio"
                                    name="unit"
                                    value="metric"
                                    onChange={handleChange}
                                    checked={
                                        weatherInfo.inputs.unit === "metric"
                                    }
                                />
                            </FieldRadioItem>
                            <FieldRadioItem>
                                <span>Fahrenheit</span>
                                <input
                                    type="radio"
                                    name="unit"
                                    value="imperial"
                                    onChange={handleChange}
                                    checked={
                                        weatherInfo.inputs.unit === "imperial"
                                    }
                                />
                            </FieldRadioItem>
                        </FieldRadioGroup>
                    </LayoutSearcher>
                    <LayoutData>
                        {weatherInfo.isLoading && <Spinner />}
                        {weatherInfo.data && (
                            <WeatherContainer
                                data={weatherInfo.data}
                                temp={weatherInfo.temp}
                                unit={weatherInfo.inputs.unit}
                            />
                        )}
                        {weatherInfo.error && (
                            <Message error>{weatherInfo.error.message}</Message>
                        )}
                        {!weatherInfo.data && !weatherInfo.error && (
                            <Message info>
                                You haven't done any searching
                            </Message>
                        )}
                    </LayoutData>
                </LayoutMain>
            ) : (
                <LayoutMain>
                    <LayoutSearcher>
                        <Message info>
                            Your API KEY will be stored in a variable, deleted
                            when you leave the page or reload the page
                        </Message>
                        <Form onSubmit={handleSaveApiKey}>
                            <FieldText>
                                <FieldInputText
                                    type="text"
                                    value={weatherInfo.inputs.apiKey || ""}
                                    onChange={handleChange}
                                    name="apiKey"
                                    placeholder="Enter your API KEY"
                                    required={true}
                                />
                            </FieldText>
                            <Button primary>Save</Button>
                        </Form>
                    </LayoutSearcher>
                </LayoutMain>
            )}
        </LayoutContainer>
    );
};

export default App;
