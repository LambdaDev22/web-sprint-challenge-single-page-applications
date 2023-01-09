import React, { useEffect } from "react";
import styled from "styled-components";
import * as yup from 'yup';
import axios from "axios";

const StyledForm = styled.form`
    margin-top: 10vh;
    height: 40.755vh;
    display: flex;
    flex-direction: column;
    padding: 15% 0 15% 0;
    background-color: #ffb720;
    justify-content: space-around;
    align-items: center;

    & .form-container {
        padding: 2.5%;
        border-radius: 7.5px;
        background-color: rgb(252, 255, 248, 0.25);
    }

    & label {
        display: flex;
        flex-direction: column;
        margin: 5%;
    }

    & #toppings-checklist {

        & .check-option {
            margin: 0;
            display: flex;
            flex-direction: row;

            & p {
                margin: 2.5%;
            }
        }
    }

    & button {
        display: block;
        margin: 12.5% auto 0 auto;
    }
`

const schema = yup.object().shape({
    name: yup.string().required('name is required').min(2, 'name must be at least 2 characters'),
    size: yup.string().required('size is required'),
    pepperoni: yup.boolean(),
    onions: yup.boolean(),
    olives: yup.boolean(),
    bacon: yup.boolean(),
    special: yup.string()
})

function Form(props) {
    function changeHandler(evt) {
        const { name, type, value, checked } = evt.target;
        const changedData = type === 'checkbox' ? checked : value;
        setFormErrors(name, changedData);
        props.setForm({ ...props.form, [name]: changedData });
    };

    function setFormErrors(name, value) {
        yup.reach(schema, name).validate(value)
            .then(() => props.setErrors({ ...props.errors, [name]: ''}))
            .catch(err => props.setErrors({ ...props.errors, [name]: err.errors[0] }))
    };

    function submitHandler(evt) {
        evt.preventDefault();
        const newOrder = { 
            name: props.form.name.trim(), 
            size: props.form.size, 
            pepperoni: props.form.pepperoni,
            onions: props.form.onions,
            olives: props.form.olives,
            bacon: props.form.bacon,
            special: props.form.special
        };
        axios.post('https://reqres.in/api/orders', newOrder)
            .then(res => {
                props.setForm({ 
                    name: '',
                    size: '',
                    pepperoni: false,
                    onions: false,
                    olives: false,
                    bacon: false,
                    special: ''
                })
                props.setOrder([ ...props.order, res.data ])
            })
            .catch(err => {console.error(err)})
    };

    useEffect (() => {
        schema.isValid(props.form).then(valid => props.setDisabled(!valid))
    }, [props.form])

    return (
        <StyledForm id="pizza-form" onSubmit={submitHandler}>
            <div className="form-container">                
                <label>Name:
                    <input id="name-input"
                        type='text'
                        name='name'
                        value={props.form.name}
                        onChange={changeHandler}
                    />
                </label>
                <label>Size:
                    <select id="size-dropdown" 
                        type='option'
                        name='size'
                        value={props.form.size}
                        onChange={changeHandler}
                        >
                            <option value=''></option>
                            <option value='small'>Small</option>
                            <option value='medium'>Medium</option>
                            <option value='large'>Large</option>s
                    </select>
                </label>
                <label>Toppings:
                    <div id="toppings-checklist">
                        <div className="check-option">                            
                            <input 
                                type='checkbox' 
                                name='pepperoni'
                                checked={props.form.pepperoni}
                                onChange={changeHandler}
                            />
                            <p>Pepperoni</p>
                        </div>
                        <div className="check-option">                            
                            <input 
                                type='checkbox' 
                                name='onions'
                                checked={props.form.onions}
                                onChange={changeHandler}
                            />
                            <p>Onions</p>
                        </div>
                        <div className="check-option">
                            <input 
                                type='checkbox' 
                                name='olives'
                                checked={props.form.olives}
                                onChange={changeHandler}
                            />
                            <p>Olives</p>
                        </div>
                        <div className="check-option">
                            <input 
                                type='checkbox' 
                                name='bacon'
                                checked={props.form.bacon}
                                onChange={changeHandler}
                            />
                            <p>Bacon</p>
                        </div>
                    </div>
                </label>
                <label>Special Instructions:           
                    <input 
                        id='special-text'
                        type='text'
                        name='special'
                        value={props.form.special}
                        onChange={changeHandler}
                    />
                </label>
                <button id='order-button' disabled={props.disabled}>Submit!</button>
            </div>
            <div className="error-messages">{props.errors.name}</div>
        </StyledForm>
    )
}

export default Form