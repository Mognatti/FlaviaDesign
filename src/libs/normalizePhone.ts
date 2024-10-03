export function normalizePhoneNumber(phoneNumber: string): string {
  const onlyNumbers = phoneNumber.replace(/[^\d+()]/g, "");

  const cleanedNumber = onlyNumbers.replace(/\(/g, "").replace(/\)/g, "");

  if (cleanedNumber.length < 11) {
    return "Número inválido: número muito pequeno! \n\nInsira ao menos 11 dígitos (confirme se colocou o 9)";
  }

  if (cleanedNumber.length > 15) {
    return "Número inválido: número muito grande! \n\nInsira até 15 dígitos";
  }

  if (cleanedNumber.startsWith("55")) {
    return `+${cleanedNumber.slice(0, 2)} ${cleanedNumber.slice(2, 4)} ${cleanedNumber.slice(
      4,
      9
    )} ${cleanedNumber.slice(9)}`;
  }
  if (cleanedNumber.startsWith("+")) {
    return `${cleanedNumber.slice(0, 3)} ${cleanedNumber.slice(3, 5)} ${cleanedNumber.slice(
      5,
      10
    )} ${cleanedNumber.slice(10)}`;
  }

  return `+55 ${cleanedNumber.slice(0, 2)} ${cleanedNumber.slice(2, 7)} ${cleanedNumber.slice(7)}`;
}
