from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
import logging
from . import models
from . import rooms

logging.basicConfig(
    format='[%(levelname)s %(asctime)s %(module)s:%(lineno)d] %(message)s', level=logging.INFO)

logger = logging.getLogger(__name__)

rooms = rooms.Rooms()


class ChatConsumer(WebsocketConsumer):

    def connect(self):
        self.user = self.scope['user']
        if self.user.id is None:
            rooms.customer_connect(self.user)
        else:
            rooms.agent_connect(self.user)
        self.accept()

    def disconnect(self, close_code):
        if self.user.id is None:
            rooms.customer_disconnect(self.user)
        else:
            rooms.agent_disconnect(self.user)

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
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
