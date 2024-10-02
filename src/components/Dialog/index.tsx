import { Button, Dialog } from "@mui/material";

type DialogProps = {
  message: string;
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function DialogComponent({ message, showDialog, setShowDialog }: DialogProps) {
  function handleClose() {
    setShowDialog(false);
  }

  return (
    <Dialog open={showDialog}>
      <div style={{ width: "300px", padding: "16px" }}>
        <div>
          <p>{message}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => handleClose()} variant="text">
            Voltar
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
