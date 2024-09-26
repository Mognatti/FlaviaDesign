import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  IconButton,
  Divider,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import { Costumer, Procedimento } from "../../../../types";
import React, { useEffect, useMemo, useState } from "react";
import * as S from "./styles";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import { SaveRounded, Search } from "@mui/icons-material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import useUpdateCostumer from "../../../../hooks/useUpdateClient";
import NewClient from "../NewClient";
import { PuffLoader } from "react-spinners";
import { getProcedimentos } from "../../../Procedimentos/components/listaProcedimentos";
import { pallete } from "../../../../styles/GlobalStyles";

const tableHeader = [
  {
    id: "name",
    label: "Nome",
  },
  {
    id: "phone",
    label: "Telefone",
  },
  {
    id: "last-procedure",
    label: "Último procedimento",
  },
  {
    id: "last-visit",
    label: "Último agendamento",
  },
  {
    id: "edit",
    label: "Editar",
  },
];

type ClientTable = {
  costumers: Costumer[] | undefined;
};

export default function ClientTable({ costumers }: ClientTable) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState<string | null>(null);
  const [filteredCostumers, setFilteredCostumers] = useState<Costumer[] | undefined>(costumers);
  const [updateName, setUpdateName] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [updateService, setUpdateService] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [procedimentos, setProcedimentos] = useState<Procedimento[]>();
  const { updateCostumer, isUpdateCostumerLoading } = useUpdateCostumer();

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggleEdit = (idx: number) => {
    setEditingRow(idx);
    setIsEditing((prev) => !prev);
  };

  const handleSubmitCostumerUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, costumer: Costumer) => {
    updateCostumer(e, updateName, updatePhone, updateService, costumer);
  };

  const handleCancelCostumerUpdate = () => {
    setIsEditing(false);
    setUpdateName("");
    setUpdatePhone("");
    setUpdateService("");
  };

  const visibleRows: Costumer[] = useMemo(() => {
    return [...filteredCostumers!].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredCostumers, page, rowsPerPage]);

  useEffect(() => {
    getProcedimentos(setProcedimentos);
  }, []);

  /**changes the table pagination text that`s controlled by MUI */
  useEffect(() => {
    const changeRows = document.querySelector(".css-pdct74-MuiTablePagination-selectLabel");
    if (changeRows) {
      changeRows.innerHTML = "Linhas por página:";
    }
  }, []);

  useEffect(() => {
    setFilteredCostumers(costumers);
    if (costumers && search) {
      setFilteredCostumers(costumers?.filter((cliente) => cliente.name.toLowerCase().includes(search.toLowerCase())));

      if (!isNaN(Number(search)) || search.includes("+") || search.includes("-")) {
        setFilteredCostumers(
          costumers?.filter((cliente) => cliente.cel_number.toLowerCase().trim().includes(search.toLowerCase().trim()))
        );
      }
    }
  }, [costumers, search]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, backgroundColor: pallete.neutral[400] }}>
        <TableContainer>
          <S.TableHeader>
            <S.TableTitle>Lista de Clientes</S.TableTitle>
            <S.HeaderForm>
              <NewClient />
              <Divider orientation="vertical" variant="middle" flexItem />
              <S.CustomAutoComplete
                options={
                  costumers
                    ?.map((costumer) => costumer.name)
                    ?.concat(costumers.map((costumer) => costumer.cel_number)) || ["carregando dados..."]
                }
                value={search}
                onChange={(_event, newValue) => setSearch(newValue as string)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Buscar cliente"
                    onChange={(e) => setSearch(e.target.value)}
                    variant="filled"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="end">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </S.HeaderForm>
          </S.TableHeader>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <S.HeaderRow>
                {tableHeader.map((cell) => (
                  <TableCell key={cell.id}>{cell.label}</TableCell>
                ))}
              </S.HeaderRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((costumer, idx) => (
                <TableRow key={costumer.id}>
                  {isEditing && editingRow === idx ? (
                    <>
                      <TableCell>
                        <TextField
                          id="name"
                          variant="standard"
                          label={costumer.name}
                          color="secondary"
                          value={updateName}
                          onChange={(e) => setUpdateName(e.target.value)}
                          disabled={isUpdateCostumerLoading}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="phone"
                          variant="standard"
                          label={costumer.cel_number}
                          color="secondary"
                          value={updatePhone}
                          onChange={(e) => setUpdatePhone(e.target.value)}
                          disabled={isUpdateCostumerLoading}
                        />
                      </TableCell>
                      <TableCell>
                        <Autocomplete
                          options={
                            procedimentos?.map((procedimento: any) => procedimento.name) || ["Carregando Procedimentos"]
                          }
                          onChange={(_event, newValue) => setUpdateService(newValue as string)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              id="last-service"
                              variant="standard"
                              color="secondary"
                              label={costumer.last_service ?? dayjs().format("DD/MM/YYYY")}
                              type="text"
                              value={updateService}
                              placeholder={costumer.last_service}
                              disabled={isUpdateCostumerLoading}
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell>{dayjs(costumer.last_visit).format("DD/MM/YYYY")}</TableCell>
                      <S.EditTableCell>
                        <S.IconWrarper>
                          {isUpdateCostumerLoading ? (
                            <PuffLoader size={14} />
                          ) : (
                            <>
                              <IconButton onClick={(e) => handleSubmitCostumerUpdate(e, costumer)}>
                                <SaveRounded color="secondary" />
                              </IconButton>
                              <IconButton onClick={() => handleCancelCostumerUpdate()}>
                                <CancelRoundedIcon color="warning" />
                              </IconButton>
                            </>
                          )}
                        </S.IconWrarper>
                      </S.EditTableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{costumer.name}</TableCell>
                      <TableCell>{costumer.cel_number}</TableCell>
                      <TableCell>{costumer.last_service}</TableCell>
                      <TableCell>{dayjs(costumer.last_visit).format("DD/MM/YYYY")}</TableCell>
                      <S.EditTableCell>
                        <IconButton onClick={() => handleToggleEdit(idx)} disabled={isEditing}>
                          <EditIcon />
                        </IconButton>
                      </S.EditTableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {!isEditing && (
            <TablePagination
              sx={{ minWidth: 725, width: "95%" }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={costumers ? costumers.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(_e, newPage) => setPage(newPage)}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </TableContainer>
      </Paper>
    </Box>
  );
}
