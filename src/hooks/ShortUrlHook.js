import useSWR from "swr";
import { listAllShortUrls } from "../services/ShortUrlService";
import UpdateLocalStorageService from "../services/UpdateLocalStorageService";

export function useShortUrlData({ initialData }) {
  const { data } = useSWR(
    "fc",
    () =>
    listAllShortUrls()
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
