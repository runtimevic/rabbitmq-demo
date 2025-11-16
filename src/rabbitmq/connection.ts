import client, { Channel, ChannelModel, Connection } from "amqplib";

let connection: Connection | ChannelModel | null = null;
let channel: Channel | null = null;

process.loadEnvFile();

const RABBITMQ_URL =
  process.env.RABBITMQ_URL || "amqp://user:root@localhost:5672";

console.log('RABBITMQ_URL=', process.env.RABBITMQ_URL);  

export async function getChannel(): Promise<Channel> {
  if (!connection) {
    connection = await client.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
  }
  if (!channel) throw new Error("can't create Channel;");
  return channel;
}

export async function closeConnection() {
  if (connection) {
    await (connection as ChannelModel).close();
    connection = null;
    channel = null;
  }
}
