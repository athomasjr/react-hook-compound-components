import { Button, Grid } from "@mui/material";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";

import SmartForm from "./components/SmartForm";
import SmartTextField from "./components/SmartForm/SmartTextField";

const schema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(20),
});

type LoginForm = z.input<typeof schema>;

function App() {
  const submitHandler: SubmitHandler<LoginForm> = (data) => {
    console.log(data);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <SmartForm
        useFormProps={{
          defaultValues: {
            username: "",
            password: "",
          },
        }}
        schema={schema}
        onSubmit={submitHandler}
      >
        {(props) => (
          <>
            <SmartTextField name="username" {...props} />
            <SmartTextField name="password" {...props} />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </>
        )}
      </SmartForm>
    </Grid>
  );
}

export default App;
