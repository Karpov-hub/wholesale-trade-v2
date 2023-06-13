<template>
  <q-page class="q-pa-lg">
    <div class="q-mb-lg">
      <div class="text-h5">Ваши чаты</div>
    </div>
    <div class="row">
      <div class="col-5 column">
        <q-btn class="q-mr-md" color="primary" icon="add" @click="openAddDialog"
          >Добавить</q-btn
        >
        <div class="chat-list">
          <q-card
            v-for="chat in chats"
            :key="chat.id"
            class="q-mt-md cursor-pointer"
            :class="{ selected: selectedChat.name === chat.name }"
            @click="selectChat(chat)"
          >
            <q-card-section>
              <q-avatar rounded size="40px" color="primary">
                <q-icon name="chat" color="white" />
              </q-avatar>
              <div class="chat-info">
                <div class="chat-name">{{ chat.name }}</div>
                <div class="chat-members">{{ chat.members }} участников</div>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat dense icon="edit" @click="openEditDialog(chat)"
                >Изменить</q-btn
              >
              <q-btn
                flat
                dense
                icon="delete"
                @click.stop="showDeleteDialog(chat)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <q-card class="q-py-md col-6">
        <div class="message-block">
          <div class="message-header">
            <div class="chat-name">{{ selectedChat.name }}</div>
            <div class="chat-members">
              {{ selectedChat.members }} участников
            </div>
          </div>
          <div id="message-list" class="message-list">
            <q-chat-message
              v-for="message in selectedChat.messages"
              :key="message.id"
              :name="message.sender"
              :text="message.text"
              :sent="message.sender !== 'Вы'"
            >
              <div>{{ message.text }}</div>
            </q-chat-message>
          </div>
          <div v-if="selectedChat.name" class="message-input">
            <q-input
              v-if="selectedChat.id !== ''"
              v-model="newMessage"
              outlined
              dense
              placeholder="Введите сообщение..."
              class="full-width q-mt-md"
              :error="isError"
              :error-message="errorMessage"
              :validation="validation"
            >
              <template #append>
                <q-icon
                  name="send"
                  class="message-send-icon"
                  :class="{
                    'text-green': newMessage.trim().length > 0,
                    'text-red': newMessage.trim().length == 0,
                  }"
                  @click="sendMessage"
                />
              </template>
            </q-input>
          </div>
        </div>
      </q-card>
    </div>
    <q-dialog
      v-model="isShownDelete"
      title="Удаление чата"
      @hide="cancelDelete"
    >
      <q-card class="q-pa-lg" style="width: 600px">
        <q-card-section class="text-h6" align="center">
          Вы уверены, что хотите удалить выбранный чат?
        </q-card-section>

        <q-card-actions align="center">
          <q-btn label="Отмена" color="primary" @click="cancelDelete" />
          <q-btn label="Удалить" color="negative" @click="deleteChat" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showEditDialog" title="Редактирование чата">
      <q-card class="q-pa-lg" style="width: 600px">
        <q-card-section>
          <q-input
            v-model="editedChatName"
            outlined
            dense
            label="Название чата"
            :error="isNameError"
            :error-message="nameErrorMessage"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Отмена" color="primary" @click="cancelEdit" />
          <q-btn label="Сохранить" color="positive" @click="saveEdit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showAddDialog" title="Добавление чата">
      <q-card class="q-pa-lg" style="width: 600px">
        <q-card-section>
          <q-input
            v-model="newChatInput"
            outlined
            dense
            label="Название чата"
            :error="isNameError"
            :error-message="nameErrorMessage"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Отмена" color="primary" @click="cancelAdd" />
          <q-btn label="Сохранить" color="positive" @click="saveAdd" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, nextTick } from "vue";

const chats = ref([
  {
    id: 1,
    name: "Групповая закупка электроники",
    members: 10,
    messages: [
      {
        id: 1,
        sender: "Вы",
        text: "Привет, кто хочет присоединиться к закупке телефонов?",
      },
      { id: 2, sender: "Пользователь1", text: "Я бы хотел присоединиться." },
      {
        id: 3,
        sender: "Вы",
        text: "Отлично, давайте соберем достаточное количество участников.",
      },
      {
        id: 4,
        sender: "Пользователь2",
        text: "Я тоже хочу присоединиться к закупке.",
      },
      { id: 5, sender: "Вы", text: "Отлично, добро пожаловать!" },
    ],
  },
  {
    id: 2,
    name: "Совместная покупка одежды",
    members: 15,
    messages: [
      {
        id: 1,
        sender: "Вы",
        text: "Привет, кто хочет присоединиться к покупке одежды?",
      },
      { id: 2, sender: "Пользователь3", text: "Я хочу присоединиться!" },
      { id: 3, sender: "Пользователь4", text: "Мне тоже интересно." },
      {
        id: 4,
        sender: "Вы",
        text: "Отлично, давайте соберем список желаемых покупок.",
      },
      {
        id: 5,
        sender: "Пользователь3",
        text: "Может начнем с выбора магазина?",
      },
    ],
  },
  {
    id: 3,
    name: "Закупка спортивного инвентаря",
    members: 8,
    messages: [
      {
        id: 1,
        sender: "Вы",
        text: "Привет, кто хочет присоединиться к закупке спортивного инвентаря?",
      },
      { id: 2, sender: "Пользователь5", text: "Я бы хотел присоединиться." },
      { id: 3, sender: "Пользователь6", text: "Мне тоже интересно." },
      {
        id: 4,
        sender: "Пользователь7",
        text: "Я уже нашел несколько вариантов спортивного инвентаря.",
      },
      { id: 5, sender: "Вы", text: "Отлично, поделись ссылками на товары!" },
    ],
  },
  {
    id: 4,
    name: "Покупка книг",
    members: 5,
    messages: [
      {
        id: 1,
        sender: "Вы",
        text: "Привет, кто хочет присоединиться к покупке книг?",
      },
      { id: 2, sender: "Пользователь8", text: "Я бы хотел присоединиться." },
      {
        id: 3,
        sender: "Вы",
        text: "Отлично, давайте составим список интересующих нас книг.",
      },
      {
        id: 4,
        sender: "Пользователь9",
        text: "У меня есть несколько предложений.",
      },
      { id: 5, sender: "Вы", text: "Спасибо, пришли их ссылки!" },
    ],
  },
]);

const showEditDialog = ref(false);
const showAddDialog = ref(false);
const newChatInput = ref("");
const editedChat = ref({});
const editedChatName = ref("");
const isNameError = ref(false);
const nameErrorMessage = ref("");
// const isMembersError = ref(false);
// const membersErrorMessage = ref("");

function openEditDialog(chat) {
  editedChat.value = chat;
  showEditDialog.value = true;
}

function cancelEdit() {
  showEditDialog.value = false;
  // Сброс ошибок и сообщений об ошибках
  isNameError.value = false;
  nameErrorMessage.value = "";
}
function saveEdit() {
  if (editedChatName.value.trim().length === 0) {
    isNameError.value = true;
    nameErrorMessage.value = "Название чата не может быть пустым";
    return;
  }

  // Найдите индекс чата в массиве `chats` по его `id`
  const index = chats.value.findIndex((chat) => {
    console.log(chat.id, editedChat.value.id);
    return chat.id === editedChat.value.id;
  });
  if (index !== -1) {
    // Обновите данные чата
    chats.value[index].name = editedChatName.value;
  }

  // Закройте диалоговое окно редактирования
  showEditDialog.value = false;
  // Сброс ошибок и сообщений об ошибках
  isNameError.value = false;
  nameErrorMessage.value = "";
}
// function openAddDialog(chat) {
//   showAddDialog.value = true;
// }
function cancelAdd() {
  showAddDialog.value = false;
  // Сброс ошибок и сообщений об ошибках
  isNameError.value = false;
  nameErrorMessage.value = "";
}
function saveAdd() {
  if (newChatInput.value.trim().length === 0) {
    isNameError.value = true;
    nameErrorMessage.value = "Название чата не может быть пустым";
    return;
  }

  const newChat = {
    id: chats.value.length + 1,
    name: newChatInput.value,
    members: 0,
    messages: [],
  };
  chats.value.push(newChat);

  // Закройте диалоговое окно редактирования
  showAddDialog.value = false;
  // Сброс ошибок и сообщений об ошибках
  isNameError.value = false;
  nameErrorMessage.value = "";
}
// Ваши существующие функции и код

const isShownDelete = ref(false);
const chatToDelete = ref(null);

function showDeleteDialog(chat) {
  chatToDelete.value = chat;
  isShownDelete.value = true;
}

function cancelDelete() {
  chatToDelete.value = null;
  isShownDelete.value = false;
}

function deleteChat() {
  const index = chats.value.findIndex(
    (chat) => chat.id === chatToDelete.value.id
  );
  if (index !== -1) {
    chats.value.splice(index, 1);
  }
  cancelDelete();
}

function selectChat(chat) {
  selectedChat.value = chat;

  // Прокрутка к последнему сообщению
  nextTick(() => {
    const messageList = document.getElementById("message-list");
    messageList.scrollTop = messageList.scrollHeight;
  });
}

const selectedChat = ref({});
const newMessage = ref("");

const isError = ref(false);
const errorMessage = ref("");
const validation = ref(null);

function sendMessage() {
  if (newMessage.value.trim().length === 0) {
    isError.value = true;
    errorMessage.value = "Сообщение не может быть пустым";
    validation.value = "error";
    return;
  }

  // Добавление нового сообщения в массив сообщений выбранного чата
  const newMessageObj = {
    id: selectedChat.value.messages.length + 1,
    sender: "Вы",
    text: newMessage.value,
  };
  selectedChat.value.messages.push(newMessageObj);

  // Сброс полей
  newMessage.value = "";
  isError.value = false;
  errorMessage.value = "";
  validation.value = null;

  // Перемотка до последнего сообщения
  nextTick(() => {
    const messageList = document.getElementById("message-list");
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  });
}
</script>

<style scoped>
/* Стили для блока ввода сообщений */
.message-input {
  margin-top: auto;
  width: 100%;
  display: flex;
  align-items: center;
}

/* Стили для иконки отправки сообщения */
.message-send-icon {
  cursor: pointer;
  margin-left: 8px;
}

/* Стили для q-input с классом "full-width" */
.full-width {
  width: 100%;
}

.row {
  margin-right: -8px;
  margin-left: -8px;
}

.col-6 {
  width: 50%;
  padding-right: 8px;
  padding-left: 8px;
}

.selected {
  background-color: #f5f5f5;
}

/* Стили для блока с чатами */
.chat-list {
  margin-right: 16px;
}

/* Стили для информации о чате */
.chat-info {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

/* Стили для имени чата */
.chat-name {
  font-weight: bold;
}

/* Стили для количества участников чата */
.chat-members {
  color: gray;
  font-size: 12px;
  margin-left: 8px;
}

/* Стили для блока с сообщениями */
.message-block {
  margin-left: 16px;
}

/* Стили для заголовка сообщений */
.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

/* Стили для имени чата в заголовке сообщений */
.chat-name-header {
  font-weight: bold;
}

/* Стили для количества участников чата в заголовке сообщений */
.chat-members-header {
  color: gray;
  font-size: 12px;
  margin-left: 8px;
}

/* Стили для списка сообщений */
.message-list {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 16px;
}
</style>
