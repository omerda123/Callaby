MAX_SESSIONS_PER_AGENT = 4


class Rooms:
    def __init__(self):
        self.logged_in_agents = []
        self.customers_queue = []
        self.rooms = {}
        self.room_id = 100

    def agent_connect(self, agent):
        self.logged_in_agents.append(agent)
        self._match()

    def agent_disconnect(self, agent):
        pass

    def customer_connect(self, customer):
        self.customers_queue.append(customer)
        self._match()

    def customer_disconnect(self, customer):
        room = self._find_customer_room(customer)
        if room is not None:
            self._delete_room(room)
        self._match()

    def _match(self):
        if len(self.logged_in_agents) == 0 or len(self.customers_queue):
            return None
        for customer in self.customers_queue:
            most_available_agent = min(self.logged_in_agents, key=lambda a: a.active_chats)
            if most_available_agent.active_chats < MAX_SESSIONS_PER_AGENT:
                self._pair(customer, most_available_agent)
            else:
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
        self.rooms[room_id].agent.active_chats -= 1
        del self.rooms[room_id]
