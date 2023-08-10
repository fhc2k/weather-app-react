import axios from "axios";

const API_KEY = "f8d0fc246484ed113a33f2c3205dacd3";

const api = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/weather",
});

export const fetchData = async (location, unit, apiKey) => {
    try {
        let response = null;

        if (typeof location === "object") {
            const { latitude, longitude } = location;
            response = await api.get(
                `?lat=${latitude}&lon=${longitude}&units=${unit}&lang=es&appid=${apiKey}`
            );
        } else {
            response = await api.get(
                `?q=${location}&units=${unit}&lang=es&appid=${apiKey}`
            );
        }

        return response.data;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error.message}`);
    }
};
