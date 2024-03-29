const normalizr = require("normalizr");
const schema = normalizr.schema;
const normalize = normalizr.normalize;

const authorSchema = new schema.Entity("authors");
const messageSchema = new schema.Entity(
  "messages",
  {
    author: authorSchema,
  },
  { idAttribute: "_id" }
);
const messageListSchema = [messageSchema];

const normalizeChat = (chat) => {
  const chatToNormalize = chat.map((msg) => ({
    author: msg.author,
    _id: msg["_id"],
    text: msg.text,
    timestamp: msg.timestamp,
    __v: msg["__v"],
  }));

  const normalizedData = normalize(chatToNormalize, messageListSchema);
  return normalizedData;
};

module.exports = { normalizeChat };
