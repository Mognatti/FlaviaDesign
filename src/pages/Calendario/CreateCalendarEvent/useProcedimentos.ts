import { useState, useEffect } from "react";
import { client } from "../../../supabaseClient";

export default function useProcedimentos() {
  const [procedimentosList, setProcedimentosList] = useState<any[]>();
  const [procedimento, setProcedimento] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    async function getProcedimentos() {
      setIsLoading(true);
      try {
        const { data, error } = await client.from("Procedimentos").select("*");
        if (error) throw error;
        if (data !== null) {
          setProcedimentosList(data);
          setIsLoading(false);
        }
        if (data === null) {
          console.log("Nenhum dado encontrado");
        }
      } catch (error: any) {
        console.log(error.message);
        setIsLoading(false);
      }
    }
    getProcedimentos();
  }, []);

  return [{ procedimentosList, procedimento, isLoading, setProcedimento }];
}
