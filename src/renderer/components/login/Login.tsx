import React from 'react';
import { Button, Form, TextField } from '@adobe/react-spectrum';

const Login = () => {
  return (
    <div>
      <Form maxWidth="size-3600">
        <TextField label="Email" />
        <TextField label="Password" />
        <Button variant="cta">Login</Button>
      </Form>
    </div>
  );
};

export default Login;
