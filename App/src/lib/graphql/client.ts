import ApolloClient from 'apollo-boost';
import { APP_VERSION, DEVICE_NAME } from 'util/const';

const userId = `LiveOLApp:${APP_VERSION}:${DEVICE_NAME}`;

export const client = new ApolloClient({
    // uri: 'https://api-liveol.larsendahl.se',
    uri: 'https://a46709d9.ngrok.io',
    headers: { userId },
});
