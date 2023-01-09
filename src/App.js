import React, { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Home from "./components/Home";
import { Route, Link, Switch } from 'react-router-dom';

const App = () => {

  const [errors, setErrors] = useState({
    name: '',
    size: '',
    pepperoni: '',
    olives: '',
    bacon: '',
    onions: '',
    special: ''
  });

  const [form, setForm] = useState({
    name: '',
    size: '',
    pepperoni: false,
    olives: false,
    bacon: false,
    onions: false,
    special: ''
  })

  const [order, setOrder] = useState([]);
  const [disabled, setDisabled] = useState(true);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/pizza'>
          <Form 
            form={form} setForm={setForm}
            errors={errors} setErrors={setErrors}
            disabled={disabled} setDisabled={setDisabled}
            order={order} setOrder={setOrder}
          />
        </Route>
      </Switch>
    </>
  );
};

export default App;
