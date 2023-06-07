import { client as supabase } from "../../../supabaseClient";

export default async function updateClient(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  name: string,
  tel: string,
  lastService: string,
  client: any
) {
  e.preventDefault();
  document.getElementById("submit")!.innerText = "Salvando...";
  try {
    const { data, error } = await supabase
      .from("Clientes")
      .update({
        name: name,
        cel_number: tel,
        last_service: lastService,
      })
      .eq("id", client.id);

    if (error) throw error;
    window.location.reload();
  } catch (error: any) {
    if (error.code == "23505") {
      alert("Telefone já registrado em outra cliente!");
    }
    alert(error.message);
    console.log("Informações sobre o erro: " + error);
  }
}
