import { useEffect, useState } from "react";
import { Client } from "../types";
import { client } from "../supabaseClient";

export default function useFetchClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isClientsLoading, setIsClientsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchClients() {
      setIsClientsLoading(true);
      try {
        const { data, error } = await client.from("Clientes").select("*");
        if (data) {
          setClients(data as Client[]);
          setIsClientsLoading(false);
        }
        if (error) {
          setIsClientsLoading(false);
          throw error;
        }
      } catch (error) {
        console.log(error);
        setIsClientsLoading(false);
      }
    }
    fetchClients();
  }, []);

  return [{ clients, isClientsLoading }];
}
