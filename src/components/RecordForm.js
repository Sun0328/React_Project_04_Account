import React, { useState } from 'react'
import * as RecordsAPI from '../utils/RecordsAPI'

import 'react-calendar/dist/Calendar.css';

export default function RecordForm({ handleNewRecord }) {
    const [input, setInput] = useState({
        date: "",
        title: "",
        amount: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'amount' ? parseFloat(value) : value;
        setInput({
            ...input,
            [name]: updatedValue
        });
    }

    // Control create record button opening or closing
    const handleValid = () => {
        return !(input.date && input.title && input.amount);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent url showing data
        RecordsAPI.create(input).then(
            response => {
                handleNewRecord(response.data);
                setInput({
                    date: "",
                    title: "",
                    amount: ""
                });
            },
        ).catch(
            error => console.log(error.message)
        )
    }

    return (
        <form className='form-inline' onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col'>
                    <input aria-label="Date" type="date" className='form-control' placeholder='Date' name='date' value={input.date} onChange={handleChange} />
                </div>
                <div className='col'>
                    <input type="text" className='form-control' placeholder='Title' name='title' value={input.title} onChange={handleChange} />
                </div>
                <div className='col'>
                    <input type="number" className='form-control' placeholder='Amount' name='amount' value={input.amount} onChange={handleChange} />
                </div>
                <div className='col'>
                    <button className='btn btn-primary' disabled={handleValid()}>Create Record</button>
                </div>
            </div>
        </form>
    )
}
