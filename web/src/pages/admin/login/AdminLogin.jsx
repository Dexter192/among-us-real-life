import { use, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function AdminLogin({ setIsAuthorized }) {
  const [adminCode, setAdminCode] = useState("");

  // Auto-authorize in dev mode
  useEffect(() => {
    if (import.meta.env.DEV) {
      setIsAuthorized(true);
    }
  }, [setIsAuthorized]);

  return (
    <Stack spacing={2} alignItems="center" sx={{ py: 3 }}>
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6" gutterBottom>
              Admin Access
            </Typography>
            <TextField
              label="Admin Code"
              type="password"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (
                    adminCode &&
                    adminCode === import.meta.env.VITE_ADMIN_CODE
                  ) {
                    setIsAuthorized(true);
                  }
                }
              }}
              fullWidth
            />
            <Button
              variant="contained"
              onClick={() => {
                if (
                  adminCode &&
                  adminCode === import.meta.env.VITE_ADMIN_CODE
                ) {
                  setIsAuthorized(true);
                }
              }}
            >
              Enter
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
