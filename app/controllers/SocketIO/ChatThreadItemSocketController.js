const Handler = lulu.use("app/errors/Handler");
const ChatThreadService = lulu.use("app/services/ChatThreadService");
const ChatThreadItemService = lulu.use("app/services/ChatThreadItemService");
const response = lulu.use("app/responses/Response");
//const Active = lulu.use("app/models/mongoose/Active");

module.exports = {
  chatThreadItemHandler: async ({ io, socket, event, payload }) => {
    try {
      const { chatThreadId, senderId, content, kind, createdBy } = payload;
      let chatTread = await ChatThreadService.getChatThreadByQuery({
        id: chatThreadId,
      });

      if (!chatTread) {
        return io.emit(
          event,
          response.builder("Chat Thread not found !", {
            success: false,
          })
        );
      }

      // ONLY TEXT LOGIC
      let newThreadItem;
      if (kind === "TEXT") {
        newThreadItem = await ChatThreadItemService.createChatThreadItem({
          chatThreadId,
          senderId,
          content,
          kind,
          createdBy,
        });
      }

      let participants = chatTread.participants.filter((x) => x != senderId);

      for (x of participants) {
        io.emit(
          `receive-thread-item-${x}`,
          response.builder("New Message", {
            threadItem: newThreadItem,
          })
        );
      }
    } catch (error) {
      io.emit(event, Handler(error));
    }
  },
};
