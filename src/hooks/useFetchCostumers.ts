import { useEffect, useState } from "react";
import { Costumer } from "../types";
import { client } from "../supabaseClient";

export default function useFetchCostumers() {
  const [costumers, setCostumers] = useState<Costumer[]>([]);
  const [isCostumerDBLoading, setIsCostumerDBLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCostumers() {
      setIsCostumerDBLoading(true);
      try {
        const { data, error } = await client.from("Clientes").select("*");
        if (data) {
          setCostumers(sortCostumersByName(data as Costumer[]));
          setIsCostumerDBLoading(false);
        }
        if (error) {
          setIsCostumerDBLoading(false);
          throw error;
        }
      } catch (error) {
        console.log(error);
        setIsCostumerDBLoading(false);
      }

      function sortCostumersByName(arr: Costumer[]) {
        const sortedArray = arr.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        return sortedArray;
      }
    }
    fetchCostumers();
  }, []);

  return { costumers, isCostumerDBLoading };
}
