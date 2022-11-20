import { ClientConfig, Client} from '@line/bot-sdk';

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new Client(clientConfig);

export default client