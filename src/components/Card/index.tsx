import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { client } from "../../supabaseClient";
import { useState, useEffect } from "react";
import styled from "styled-components";

const List = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 16px;
`;

export default function Card() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [lastVisit, setLastVisit] = useState<any>(null);
  const [clients, setClients] = useState<any[]>();

  async function getClients() {
    try {
      const { data, error } = await client.from("Clientes").select("*");
      if (error) throw error;
      if (data != null) setClients(data);
    } catch (error: any) {
      alert(error.message);
    }
  }

  useEffect(() => {
    getClients();
  }, []);
  console.log(clients);

  return !editing ? (
    <div>
      <div>
        <img src="" alt="" />
      </div>
      <List>
        {clients?.map((client) => (
          <li>
            <p>{client.name}</p>
            <p>{client.last_visit}</p>
          </li>
        ))}
      </List>
      <div>
        <button onClick={() => setEditing(true)}>Editar</button>
      </div>
    </div>
  ) : (
    <form>
      <div>
        <img src="" alt="" />
      </div>
      <h4>Editando Cliente...</h4>
      <div>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <DatePicker
          label="Última Visita"
          value={lastVisit}
          onChange={(newDate: any) => setLastVisit(newDate)}
        />
      </div>
      <div>
        <button onClick={() => setEditing(false)}>Salvar</button>
      </div>
    </form>
  );
}
