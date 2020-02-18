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

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        logger.info(f"new consumer: {self.groups}")

    def connect(self):
        self.accept()
        self.user = self.scope['user']
        if self.user.id is None:
            rooms.customer_connect(self)
        else:
            rooms.agent_connect(self)

    def disconnect(self, close_code):
        if self.user.id is None:
            rooms.customer_disconnect(self)
        else:
            rooms.agent_disconnect(self)

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        logger.info(text_data_json)
        type = text_data_json['type']
        if type == 'connect':
            logger.info('--- connect ----')
        elif type == 'message':
            rooms.send_msg(text_data_json)
            #save to db
            # models.Message.objects.create(chat_id=self.room_name,agent='agent_name',customer='customer',message=message)
        else:
            logger.info('------- error --------')




