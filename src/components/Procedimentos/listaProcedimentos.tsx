import { client } from "../../supabaseClient";

export async function getProcedimentos(
  setProcedimentos: React.Dispatch<React.SetStateAction<any[] | undefined>>
) {
  try {
    const { data, error } = await client.from("Procedimentos").select("*");
    if (error) throw error;
    if (data !== null) {
      setProcedimentos(data);
    }
  } catch (error: any) {
    alert(error.message);
  }
}

export async function updateProcedimento(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  name: string,
  preco: number,
  horas: number,
  minutos: number,
  procedimento: any
) {
  e.preventDefault();
  document.getElementById("change-procedimento")!.innerText = "salvando...";
  try {
    const { data, error } = await client
      .from("Procedimentos")
      .update({
        name: name,
        price: preco,
        hours: horas,
        minutes: minutos,
      })
      .eq("id", procedimento.id);
    if (error) throw error;
    window.location.reload();
  } catch (error: any) {
    alert(error.message);
  }
}

export async function createProcedimento(
  e: React.MouseEvent<HTMLButtonElement>,
  name: string,
  preco: number,
  horas: number,
  minutos: number
) {
  e.preventDefault();

  try {
    const { data, error } = await client.from("Procedimentos").insert({
      name: name,
      price: preco,
      hours: horas,
      minutes: minutos,
    });
    if (error) throw error;
    window.location.reload();
  } catch (error: any) {
    alert(error.message);
  }
}
