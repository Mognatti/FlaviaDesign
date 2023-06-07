export const procedimentos = [
  {
    nome: "Design Simples",
    horas: 0,
    minutos: 30,
    preço: 50,
  },
  {
    nome: "Design com Rena",
    horas: 0,
    minutos: 40,
    preço: 55,
  },
  {
    nome: "Micropigmentação Shadow",
    horas: 1,
    minutos: 30,
    preço: 350,
  },
  {
    nome: "Micropigmentação Fio a Fio",
    horas: 2,
    minutos: 0,
    preço: 350,
  },
  {
    nome: "Lash Lift",
    horas: 1,
    minutos: 0,
    preço: 100,
  },
  {
    nome: "Cílios fio a fio",
    horas: 3,
    minutos: 0,
    preço: 150,
  },
];

export const procedimentosNome = procedimentos.map(
  (procedimento) => procedimento.nome
);
