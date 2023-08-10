import { useState } from "react";
import {
    LayoutContainer,
    LayoutData,
    LayoutMain,
    LayoutSearcher,
} from "./styled-components/Layouts";
import { Form } from "./styled-components/Forms";
import { FieldText, FieldInputText } from "./styled-components/FormsFields";
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
    };

    const [weatherInfo, setWeatherInfo] = useState({ ...initialWeatherInfo });

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
            const data = await fetchData(weatherInfo.inputs.location, "metric", weatherInfo.apiKey);
            setWeatherInfo((prev) => ({ ...prev, data, error: null }));
        } catch (error) {
            setWeatherInfo((prev) => ({ ...prev, data: null, error }));
        } finally {
            setWeatherInfo((prev) => ({
                ...prev,
                isLoading: false,
                inputs: { ...initialWeatherInfo.inputs },
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
            const data = await fetchData(position.coords, "metric", weatherInfo.apiKey);
            setWeatherInfo((prev) => ({ ...prev, data, error: null }));
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
            {!weatherInfo.apiKey && (
                <LayoutMain>
                    <LayoutSearcher>
                        <Form onSubmit={handleSaveApiKey}>
                            <FieldText>
                                <FieldInputText
                                    type="text"
                                    value={weatherInfo.inputs.apiKey || ""}
                                    onChange={handleChange}
                                    name="apiKey"
                                    placeholder="Enter your APIKEY"
                                    required={true}
                                />
                            </FieldText>
                            <Button primary>Save</Button>
                        </Form>
                    </LayoutSearcher>
                </LayoutMain>
            )}
            {weatherInfo.apiKey && (
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
                            <Button primary>Buscar</Button>
                        </Form>
                        <p>o</p>
                        <Button secondary onClick={handleGeolocation}>
                            Buscar por mi ubicación
                        </Button>
                    </LayoutSearcher>
                    <LayoutData>
                        {weatherInfo.isLoading && <Spinner />}
                        {weatherInfo.data && (
                            <WeatherContainer data={weatherInfo.data} />
                        )}
                        {weatherInfo.error && (
                            <Message error>{weatherInfo.error.message}</Message>
                        )}
                        {!weatherInfo.data && !weatherInfo.error && (
                            <Message info>
                                No haz hecho ninguna busqueda
                            </Message>
                        )}
                    </LayoutData>
                </LayoutMain>
            )}
        </LayoutContainer>
    );
};

export default App;
