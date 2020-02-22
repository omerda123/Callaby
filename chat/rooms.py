import json
import logging
from asgiref.sync import async_to_sync

from . import consumers

MAX_SESSIONS_PER_AGENT = 4

logging.basicConfig(
    format='[%(levelname)s %(asctime)s %(module)s:%(lineno)d] %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)


class Rooms:
    def __init__(self):
        self.logged_in_agents = []
        self.customers_queue = []
        self.rooms = {}
        self.room_id = 100
        self.admins = []

    def agent_connect(self, agent):
        self.logged_in_agents.append(agent)
        self._match()
        logger.info(f"agent {agent} logged in")

    def agent_disconnect(self, agent):
        self.logged_in_agents.remove(agent)
        logger.info(f"rooms: {self.rooms}")

    def customer_connect(self, customer):
        self.customers_queue.append(customer)
        self._match()
        logger.info(f"customer {customer} logged in")

    def customer_disconnect(self, customer):
        room = self._find_customer_room(customer)
        if room is not None:
            message = {
                'type': 'disconnect',
                'body': {'room_id': room}
            }
            text_msg = json.dumps(message)
            async_to_sync(self.rooms[room][1].send(text_data=text_msg))
            self._delete_room(room)
        self._match()

    def _match(self):
        logger.info('try to match customer to agent')
        if len(self.logged_in_agents) == 0 or len(self.customers_queue) == 0:
            logger.info(f'logged in agents:{self.logged_in_agents}')
            logger.info(f'queued customers:{self.customers_queue}')
            logger.info('no agents or no customers')
            return None
        for customer in self.customers_queue:
            most_available_agent = min(self.logged_in_agents, key=lambda a: a.user.adminuser.active_chats)
            logger.info(f"**{most_available_agent}**")
            if most_available_agent.user.adminuser.active_chats < MAX_SESSIONS_PER_AGENT:
                logger.info(f'found agent to customer!! : {most_available_agent}')
                self._pair(customer, most_available_agent)
            else:
                logger.info('logged in agent is not available')
                return None

    def _pair(self, customer, agent):
        self.room_id += 1
        room_id = self.room_id
        self.rooms[room_id] = [customer, agent]
        self.customers_queue.remove(customer)
        logger.info(f" rooms : {self.rooms}")
        message = {
            'type': 'connect',
            'body': {'room_id': room_id}
        }
        text_msg = json.dumps(message)
        logger.info('send connect message to agent')
        async_to_sync(customer.send(text_data=text_msg))
        async_to_sync(agent.send(text_data=text_msg))
        self.send_notification_to_admin()

    def _find_customer_room(self, customer):
        logger.info(f"looking for {customer}")
        logger.info(self.rooms)
        for room, participants in self.rooms.items():
            if customer in participants:
                return room
        return None

    def _delete_room(self, room_id):
        self.rooms[room_id][1].user.adminuser.active_chats -= 1
        del self.rooms[room_id]

    def send_msg_to_customer(self, message):
        logger.info(f"send message to customer {message}")
        room_id = int(message['body']['room_id'])
        if room_id in self.rooms.keys():
            customer = self.rooms[room_id][0]
            logger.info(f'customer is {customer}!!!!')
            async_to_sync(customer.send(text_data=json.dumps(message)))
        else:
            logger.info(f'room {room_id} is not in rooms')

    def send_msg_to_agent(self, customer, message):
        logger.info(f"send message to agent {message}")
        room_id = self._find_customer_room(customer)
        if room_id in self.rooms.keys():
            agent = self.rooms[room_id][1]
            logger.info(f'agent is {agent}!!!!')
            message['body']['room_id'] = room_id
            async_to_sync(agent.send(text_data=json.dumps(message)))
        else:
            logger.info(f'room {room_id} is not in rooms')

    def admin_subscribe(self, admin):
        self.admins.append(admin)

    def admin_unsubscribe(self, admin):
        self.admins.remove(admin)

    def send_notification_to_admin(self):
        logger.info(f"logged in admins: {self.admins}")
        new_rooms = self.participants_serializer(self.rooms)
        if self.admins:
            for admin in self.admins:
                message = {
                    'type': 'admin_stat',
                    'body': new_rooms
                }
                async_to_sync(admin.send(text_data=json.dumps(message)))
                logging.info(f"send to admin {new_rooms}")

    def participants_serializer(self, rooms):
        new_rooms = {}
        for room, participants in rooms.items():
            logger.info(f"customer {participants[0]} name is {participants[0].customer_name}")
            new_rooms[room] = [participants[0].customer_name,
                               participants[1].user.first_name + " " + participants[1].user.last_name]
            logger.info(f"new rooms: {new_rooms}")
        return new_rooms
