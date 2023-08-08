import { client } from "../../supabaseClient";
import { Client } from "../../types";

export async function getClientsNameAndCell(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setClientList: React.Dispatch<React.SetStateAction<Client[] | undefined>>
) {
  try {
    setLoading(true);
    const { data, error } = await client
      .from("Clientes")
      .select("id, name, cel_number");
    if (error) throw error;
    if (data != null) setClientList(data);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
}

export async function getClientsFullData(
  setClients: React.Dispatch<React.SetStateAction<any[] | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const { data, error } = await client.from("Clientes").select("*");
    if (error) throw error;
    if (data != null) setClients(data);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
}
