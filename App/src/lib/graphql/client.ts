import ApolloClient from 'apollo-boost';
import { APP_VERSION, DEVICE_NAME } from 'util/const';

const userId = `LiveOLApp:${APP_VERSION}:${DEVICE_NAME}`;

export const client = new ApolloClient({
    uri: 'https://e390c117.ngrok.io',
    // uri: 'https://api.liveol.larsendahl.se',
    headers: { userId },
});
