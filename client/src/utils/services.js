export const baseUrl = "http://localhost:3000/api";

export let postRequest = async (url, body) => {
  console.log("body", body);
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  let data = await response.json();

  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }

  return data;
};

export const getRequest = async (url) => {
  const response = await fetch(url);
  let data = await response.json();

  if (!response.ok) {
    let message = "There's an error occured...";

    if (data?.message) {
      message = data.message;
    }
    return { error: true, message };
  }

  return data;
};
