import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
  let { user } = useContext(AuthContext);
  let { potentialChats, createChat, onLineUsers } = useContext(ChatContext);
  //   console.log("potentialChats", potentialChats);
  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((u, index) => {
            return (
              <div
                className="single-user "
                key={index}
                onClick={() => createChat(user?._id, u?._id)}
              >
                {u.name}
                <span
                  className={
                    onLineUsers?.some((user) => user?.userId === u?._id)
                      ? "user-online"
                      : ""
                  }
                ></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChats;
