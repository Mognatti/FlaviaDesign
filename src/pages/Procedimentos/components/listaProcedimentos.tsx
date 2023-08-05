import { client } from "../../../supabaseClient";
import { Procedimento } from "../../../types";

export async function getProcedimentos(
  setProcedimentos: React.Dispatch<
    React.SetStateAction<Procedimento[] | undefined>
  >
) {
  try {
    const { data, error } = await client.from("Procedimentos").select("*");
    if (error) throw error;
    if (data !== null) {
      setProcedimentos(data as Procedimento[]);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function updateProcedimento(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  name: string,
  preco: number | string,
  horas: number | string,
  minutos: number | string,
  procedimento: Procedimento
) {
  e.preventDefault();
  const ref = document.getElementById("change-procedimento");
  if (ref) ref.innerText = "salvando...";
  try {
    const { error } = await client
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message);
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
    const { error } = await client.from("Procedimentos").insert({
      name: name,
      price: preco,
      hours: horas,
      minutes: minutos,
    });
    if (error) throw error;
    window.location.reload();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message);
  }
}
