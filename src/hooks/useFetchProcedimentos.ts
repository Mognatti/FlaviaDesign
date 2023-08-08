import { useEffect, useState } from "react";
import { Procedimento } from "../types";
import { client } from "../supabaseClient";

export default function useFetchProcedimentos() {
  const [procedimentos, setClients] = useState<Procedimento[]>([]);
  const [isProcedimentosLoading, setIsProcedimentosLoading] =
    useState<boolean>(false);

  useEffect(() => {
    async function fetchClients() {
      setIsProcedimentosLoading(true);
      try {
        const { data, error } = await client.from("Procedimentos").select("*");
        if (data) {
          setClients(data as Procedimento[]);
          setIsProcedimentosLoading(false);
        }
        if (error) {
          setIsProcedimentosLoading(false);
          throw error;
        }
      } catch (error) {
        console.log(error);
        setIsProcedimentosLoading(false);
      }
    }
    fetchClients();
  }, []);

  return [{ procedimentos, isProcedimentosLoading }];
}
