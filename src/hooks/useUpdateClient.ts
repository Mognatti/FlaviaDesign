import { useState } from "react";
import { normalizePhoneNumber } from "../libs/normalizePhone";
import { client as supabase } from "../supabaseClient";
import { Costumer } from "../types";

export default function useUpdateCostumer() {
  const [isUpdateCostumerLoading, setIsUpdatadeCostumerLoading] = useState(false);

  async function updateCostumer(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    updateName: string,
    updatePhone: string,
    updateService: string | undefined,
    costumer: Costumer
  ) {
    e.preventDefault();
    setIsUpdatadeCostumerLoading(true);

    if (!updateName) {
      updateName = costumer.name;
    }
    if (!updatePhone) {
      updatePhone = costumer.cel_number;
    }
    if (!updateService) {
      updateService = costumer.last_service;
    }

    updatePhone = normalizePhoneNumber(updatePhone);
    if (!updatePhone.startsWith("+")) {
      setIsUpdatadeCostumerLoading(false);
      return alert(updatePhone);
    }

    try {
      const { error } = await supabase
        .from("Clientes")
        .update({
          name: updateName,
          cel_number: updatePhone,
          last_service: updateService,
        })
        .eq("id", costumer.id);
      setIsUpdatadeCostumerLoading(false);
      if (error) throw error;
      setIsUpdatadeCostumerLoading(false);
      window.location.reload();
    } catch (error: any) {
      setIsUpdatadeCostumerLoading(false);
      if (error.code == "23505") {
        alert("Telefone já registrado em outra cliente!");
      }
      alert(error.message);
      console.log("Informações sobre o erro: " + error);
    }
  }
  return { isUpdateCostumerLoading, updateCostumer };
}
