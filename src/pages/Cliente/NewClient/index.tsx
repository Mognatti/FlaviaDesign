import { client } from "../../../supabaseClient";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Form, Title, Submit } from "../../../components/StyledComponents";

export default function NewClient() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [loading, setLoading] = useState(false);

  async function createClient() {
    setLoading(true);
    try {
      const { data, error } = await client.from("Clientes").insert({
        name: name,
        cel_number: tel,
      });
      if (error) throw error;
      setLoading(false);
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <Form>
      <br />
      <Title>Cadastrar novo cliente</Title>
      <br />
      <TextField
        label="Nome"
        variant="filled"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></TextField>
      <br />
      <TextField
        label="Telefone"
        variant="filled"
        type="tel"
        inputProps={{ inputMode: "tel" }}
        value={tel}
        onChange={(e) => setTel(e.target.value)}
      ></TextField>
      <br />
      <Submit variant="outlined" color="success" onClick={() => createClient()}>
        {" "}
        Cadastrar{" "}
      </Submit>
      <br />
      {loading && <h3>criando cliente...</h3>}
    </Form>
  );
}
