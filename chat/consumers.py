import json
import logging

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

from . import models

logging.basicConfig(
    format='[%(levelname)s %(asctime)s %(module)s:%(lineno)d] %(message)s', level=logging.INFO)

logger = logging.getLogger(__name__)

logged_in_agents = []


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        logger.info(f"> Start chat #{self.room_group_name}")

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket

    @database_sync_to_async
    def save_chat(self, chat_id, agent, customer, message):
        logger.info(f"Creating message chat#{chat_id} by {agent}: {message!r}")
        models.Message.objects.create(
            chat_id=chat_id,
            agent=agent,
            customer=customer,
            content=message,
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        agent = text_data_json['agent']
        message = text_data_json['message']
        print(message)
        if message == 'init':
            logged_in_agents.append(agent)
            logger.info(logged_in_agents)
        elif message == 'close':
            logged_in_agents.remove(agent)
            logger.info(logged_in_agents)
        else:
            # await self.save_chat(**text_data_json)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message
                }
            )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
