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
        self.customer_name = ""

    def connect(self):
        self.accept()
        self.user = self.scope['user']
        if self.user.id is None:
            rooms.customer_connect(self)
            logger.info('customer!')
        elif self.user.adminuser.role_id == 1:
            rooms.agent_connect(self)
            logger.info('agent!')
        elif self.user.adminuser.role_id == 2:
            rooms.admin_subscribe(self)
            logger.info('admin!')

    def disconnect(self, close_code):
        if self.user.id is None:
            rooms.customer_disconnect(self)
        elif self.user.adminuser.role_id == 1:
            rooms.agent_disconnect(self)
        elif self.user.adminuser.role_id == 2:
            rooms.admin_unsubscribe(self)

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        logger.info(text_data_json)
        type = text_data_json['type']
        if type == 'connect':
            logger.info('--- connect ----')
        elif type == 'customer_message':
            rooms.send_msg_to_agent(self, text_data_json)
        elif type == 'message':
            rooms.send_msg_to_customer(text_data_json)
            rooms.send_notification_to_admin()
        elif type == 'send_product':
            rooms.send_msg_to_customer(text_data_json)
        elif type == 'start_form':
            form_fields = models.Form.objects.get(id=text_data_json['body']['form-fields']).fields
            text_data_json['body']['form-fields'] = json.dumps(form_fields)
            logger.info(text_data_json)
            rooms.send_msg_to_customer(text_data_json)
        elif type == 'form_data':
            rooms.send_msg_to_customer(text_data_json)
        elif type == 'customer_name':
            self.customer_name = text_data_json['body']['name']
            rooms.send_msg_to_agent(self, text_data_json)
        else:
            logger.info('------- error --------')
