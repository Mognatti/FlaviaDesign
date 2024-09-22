import { useEffect, useState } from "react";
import { Costumer } from "../types";
import { client } from "../supabaseClient";

export default function useFetchCostumersNameAndPhone() {
  const [costumersNameAndPhone, setCostumersNameAndPhone] = useState<Costumer[]>([]);
  const [isLoadingNameAndPhone, setIsLoadigNameAndPhone] = useState(false);

  useEffect(() => {
    async function getCostumersNameAndCell(
      setCostumersList: React.Dispatch<React.SetStateAction<Costumer[]>>,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) {
      try {
        setLoading(true);
        const { data, error } = await client.from("Clientes").select("id, name, cel_number");
        if (error) throw error;
        if (data != null) setCostumersList(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getCostumersNameAndCell(setCostumersNameAndPhone, setIsLoadigNameAndPhone);
  }, []);

  return { costumersNameAndPhone, isLoadingNameAndPhone };
}
