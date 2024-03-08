import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
const UserChat = ({ chat, user }) => {
  let { recipientUser } = useFetchRecipientUser(chat, user);
  let { onLineUsers } = useContext(ChatContext);

  let isOnLine = onLineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );
  //   console.log(recipientUser);

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} height="35px" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Text Message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">8/3/2020</div>
        <div className="this-user-notifications">2</div>
        <span className={isOnLine ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
};

export default UserChat;