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
          setCostumers(data as Costumer[]);
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
    }
    fetchCostumers();
  }, []);

  return [{ costumers, isCostumerDBLoading }];
}
