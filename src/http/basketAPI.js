import { $authHost, $host } from ".";

export const addToBasket = async (deviceId) => {
  const response = await $authHost.post(
    "/api/basket",
    { deviceId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const fetchBasket = async () => {
  const response = await $authHost.get("/api/basket");
  return response.data;
};

export const deleteFromBasket = async (deviceId) => {
  const response = await $authHost.delete(`/api/basket/${deviceId}`);
  return response.data;
};
