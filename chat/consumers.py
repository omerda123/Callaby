from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
import logging
from . import models
import channels_redis
from channels.auth import login

logging.basicConfig(
    format='[%(levelname)s %(asctime)s %(module)s:%(lineno)d] %(message)s', level=logging.INFO)

logger = logging.getLogger(__name__)

from . import rooms


rooms = rooms.Rooms()


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        logger.info(f"1 {self.scope['user']}, {self.channel_name!r}")
        # agent login
        async_to_sync(self.channel_layer.group_add)(
            "xxx",
            self.channel_name,
        )

        # customer login
        # agent_channel_name = self.channel_layer.groups["xxx"].popitem()[0]
        # print(agent_channel_name)

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        self.user = self.scope['user']
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name,
        )
        self.accept()
        if self.user.id is None:
            customers_queue.append(self.user)
        else:
            logged_in_agents.append(self.user)
        logger.info(f'{self.user}')
        logger.info(f"Logged in agents: {logged_in_agents}")
        logger.info(f"Customers queue: {customers_queue}")

    def disconnect(self, close_code):
        if self.user.id is None:
            customers_queue.remove(self.user)
        else:
            logged_in_agents.remove(self.user)
        logger.info(f"Logged in agents: {logged_in_agents}")

    # Receive message from WebSocket
    def receive(self, text_data):
        # login(self.scope, user)
        text_data_json = json.loads(text_data)
        logger.info(repr(text_data_json))
        message = text_data_json['message']
        models.Message.objects.create(
            chat_id=self.room_name,
            agent='agent_name',
            customer='customer',
            message=message,
        )
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'agent': 'Omer Daniel',
            'chat_id': "{{ room_name|escapejs }}",
            'custome    r': 'unknown_customer',
            'message': message,
        }))
