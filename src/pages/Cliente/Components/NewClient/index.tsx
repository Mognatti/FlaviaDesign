import { client } from "../../../../supabaseClient";
import { useState } from "react";
import { Box, IconButton, Modal, TextField } from "@mui/material";
import * as S from "../../styles";
import { Submit } from "../../../../styles/GlobalStyles";
import { Add } from "@mui/icons-material";
import { PuffLoader } from "react-spinners";
import { normalizePhoneNumber } from "../../../../libs/normalizePhone";

export default function NewClient() {
  const [costumerName, setCostumerName] = useState("");
  const [costumerPhone, setCostumerPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  async function createClient() {
    setIsLoading(true);
    let newValue = costumerPhone;

    if (!costumerName || !costumerPhone) {
      setIsLoading(false);
      return alert("bota os dados ai, cara");
    }

    if (costumerName.length < 3) {
      setIsLoading(false);
      return alert("Insira um nome com pelo menos 3 caracteres!");
    }

    newValue = normalizePhoneNumber(costumerPhone);

    if (!newValue.startsWith("+")) {
      setIsLoading(false);
      return alert(newValue);
    }

    try {
      const { error } = await client.from("Clientes").insert({
        name: costumerName,
        cel_number: newValue,
      });
      if (error) throw error;
      setIsLoading(false);
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <>
      <IconButton onClick={() => setShowModal(true)}>
        <Add />
      </IconButton>
      {showModal && (
        <Box sx={{ width: "100svw", height: "100svh", position: "absolute", top: 0, left: 0 }}>
          <Modal open={showModal}>
            <S.ModalContent>
              <S.Form>
                <S.FormHeader>
                  <p>Novo Cadastro</p>
                  <IconButton onClick={() => setShowModal(false)}>
                    <S.CloseIcon />
                  </IconButton>
                </S.FormHeader>
                <TextField
                  label="Nome"
                  variant="standard"
                  value={costumerName}
                  onChange={(e) => setCostumerName(e.target.value)}
                  required
                  sx={{ minWidth: 300 }}
                />
                <br />
                <TextField
                  label="Telefone"
                  variant="standard"
                  type="tel"
                  inputProps={{ inputMode: "tel" }}
                  value={costumerPhone}
                  onChange={(e) => setCostumerPhone(e.target.value)}
                  required
                  sx={{ minWidth: 300 }}
                />
                <br />
                <Submit variant="contained" color="primary" onClick={() => createClient()}>
                  {isLoading ? <PuffLoader size={25} color="#c3ccbf" /> : "Cadastrar"}
                </Submit>
                <Submit variant="contained" color="error" onClick={() => setShowModal(!showModal)}>
                  Cancelar
                </Submit>
                <br />
              </S.Form>
            </S.ModalContent>
          </Modal>
        </Box>
      )}
    </>
  );
}
