import { Button } from "@mui/material";
import { useReportDeadBody } from "../../../hooks/useReportDeadBody";

export default function ReportDeadBody() {
  const { reportDeadBody } = useReportDeadBody();

  return (
    <Button
      sx={{
        backgroundImage: "url(/images/report.png)",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        p: 10,
      }}
      onClick={reportDeadBody}
    ></Button>
  );
}
