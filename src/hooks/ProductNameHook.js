import useSWR from "swr";
import { listAllProductNames } from "../services/ProductNameService";
import UpdateLocalStorageService from "../services/UpdateLocalStorageService";

export function useProductNameData({ initialData }) {
  // fc is the key used to identify the cached flexCal data
  const { data } = useSWR(
    "fc",
    () =>
    listAllProductNames()
        .then(async (res) => {
          return await Promise.all(res);
        })
        .catch((err) => {
          console.log(err);
        }),
    {
      initialData,
    }
  );

  UpdateLocalStorageService();

  return data;
}
