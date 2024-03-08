import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  let [recipientUser, setRecipientUser] = useState(null);
  let [error, setError] = useState(null);

  let recipientId = chat?.members.find((id) => id !== user?._id);

  useEffect(() => {
    let getUser = async () => {
      if (!recipientId) return null;

      let response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

      if (response.error) {
        return setError(response);
      }

      setRecipientUser(response);
    };
    getUser();
  }, [recipientId]);
  return { recipientUser };
};
