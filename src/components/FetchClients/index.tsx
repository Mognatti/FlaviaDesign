import { client } from "../../supabaseClient";

export async function getClientsNameAndCell(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setClientList: React.Dispatch<React.SetStateAction<any[] | undefined>>
) {
  try {
    setLoading(true);
    const { data, error } = await client
      .from("Clientes")
      .select("name, cel_number");
    if (error) throw error;
    if (data != null) setClientList(data);
    setLoading(false);
  } catch (error: any) {
    alert(error.message);
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
  } catch (error: any) {
    alert(error.message);
  }
}
