import logging

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

    def agent_connect(self, agent):
        self.logged_in_agents.append(agent)
        self._match()
        logger.info(f"agent {agent} logged in")

    def agent_disconnect(self, agent):
        pass

    def customer_connect(self, customer):
        self.customers_queue.append(customer)
        self._match()
        logger.info(f"customer {customer} logged in")

    def customer_disconnect(self, customer):
        room = self._find_customer_room(customer)
        if room is not None:
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
            most_available_agent = min(self.logged_in_agents, key=lambda a: a.adminuser.active_chats)
            if most_available_agent.adminuser.active_chats < MAX_SESSIONS_PER_AGENT:
                logger.info(f'found agent to customer!! : {most_available_agent}')
                self._pair(customer, most_available_agent)
            else:
                logger.info('logged in agent is not available')
                return None

    def _pair(self, customer, agent):
        self.room_id += 1
        room_id = self.room_id

    def _find_customer_room(self, customer):
        for room, participants in self.rooms.items():
            if customer in participants:
                return room
        return None

    def _delete_room(self, room_id):
        self.rooms[room_id].agent.adminuser.active_chats -= 1
        del self.rooms[room_id]
