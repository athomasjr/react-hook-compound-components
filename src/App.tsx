import { Button, FormGroup, FormLabel, Grid, Box } from "@mui/material";

import { z } from "zod";
import { SubmitHandler, useForm, useFormContext } from "react-hook-form";

import SmartForm from "./components/SmartForm";
import SmartTextField from "./components/SmartForm/SmartTextField";
import SmartFormWithHook from "./components/SmartForm/SmartFormWithHook";
import { useSmartForm } from "./hooks/useSmartForm";

const schema = z
  .object({
    username: z.string().min(3).max(20),
    password: z.string().min(3).max(20),
  })
  .required();

type LoginForm = z.infer<typeof schema>;

function App() {
  const [methods] = useSmartForm<LoginForm>({
    schema,
    useFormProps: {
      defaultValues: {
        username: "test",
        password: "test",
      },
    },
  });

  const {
    formState: { errors },
  } = methods;

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
      <SmartFormWithHook methods={methods} onSubmit={submitHandler}>
        {(props) => (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <FormGroup sx={{ gap: "16px" }}>
              <FormGroup>
                <FormLabel>Username</FormLabel>
                <SmartTextField
                  fieldProps={{
                    error: Boolean(errors.username),
                    helperText: errors.username?.message,
                  }}
                  name="username"
                  {...props}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Password</FormLabel>
                <SmartTextField
                  fieldProps={{
                    error: Boolean(errors.password),
                    helperText: errors.password?.message,
                  }}
                  name="password"
                  {...props}
                />
              </FormGroup>
            </FormGroup>
            <Button
              disabled={Boolean(errors.username || errors.password)}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        )}
      </SmartFormWithHook>
      {/*<SmartForm*/}
      {/*  useFormProps={{*/}
      {/*    defaultValues: {*/}
      {/*      username: "",*/}
      {/*      password: "",*/}
      {/*    },*/}
      {/*  }}*/}
      {/*  schema={schema}*/}
      {/*  onSubmit={submitHandler}*/}
      {/*>*/}
      {/*  {(props) => (*/}
      {/*    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>*/}
      {/*      <FormGroup sx={{ gap: "16px" }}>*/}
      {/*        <FormGroup>*/}
      {/*          <FormLabel>Username</FormLabel>*/}
      {/*          <SmartTextField name="username" {...props} />*/}
      {/*        </FormGroup>*/}
      {/*        <FormGroup>*/}
      {/*          <FormLabel>Password</FormLabel>*/}
      {/*          <SmartTextField name="password" {...props} />*/}
      {/*        </FormGroup>*/}
      {/*      </FormGroup>*/}
      {/*      <Button variant="contained" type="submit">*/}
      {/*        Submit*/}
      {/*      </Button>*/}
      {/*    </Box>*/}
      {/*  )}*/}
      {/*</SmartForm>*/}
    </Grid>
  );
}

export default App;
