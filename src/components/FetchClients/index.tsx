import { client } from "../../supabaseClient";
import { Costumer } from "../../types";

export async function getCostumersFullData(
  setCostumers: React.Dispatch<React.SetStateAction<Costumer[] | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const { data, error } = await client.from("Clientes").select("*");
    if (error) throw error;
    if (data != null) setCostumers(data as Costumer[]);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
}
