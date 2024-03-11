import React, { useState } from 'react'
import * as RecordsAPI from '../utils/RecordsAPI'

export default function Record({ id, date, title, amount, handleUpdateRecord, handleDeleteRecord }) {
    const [edit, setEdit] = useState(false)
    const [record, setRecord] = useState({
        date: date,
        title: title,
        amount: amount
    });

    const handleEditRecord = () => {
        setEdit(true)
    }

    const handleCancelEdit = () => {
        setEdit(false)
    }

    const handleEditContent = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'amount' ? parseFloat(value) : value;
        setRecord({
            ...record,
            [name]: updatedValue
        });
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        setEdit(false)
        RecordsAPI.update(id, record).then(
            response => {
                handleUpdateRecord(response.data);
            },
        ).catch(
            error => console.log(error.message)
        )
    }

    const handleDelete = (event) => {
        event.preventDefault();
        console.log(id);
        RecordsAPI.deleteRecord(id).then(
            response => {
                handleDeleteRecord(id);
            },
        ).catch(
            error => console.log(error.message)
        )
    }

    const recordRow = (
        <tr key={id}>
            <td>{date}</td>
            <td>{title}</td>
            <td>{amount}</td>
            <td>
                <button className='btn btn-info' style={{ marginRight: '5px' }} onClick={handleEditRecord}>Edit</button>
                <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    )

    const recordEdit = (
        <tr key={id}>
            <td><input aria-label="Date" type="date" className='form-control' value={record.date} name='date' onChange={handleEditContent} /></td>
            <td><input type="text" className='form-control' value={record.title} name='title' onChange={handleEditContent} /></td>
            <td><input type="number" className='form-control' value={record.amount} name='amount' onChange={handleEditContent} /></td>
            <td>
                <button className='btn btn-info' style={{ marginRight: '5px' }} onClick={handleUpdate}>Update</button>
                <button className='btn btn-danger' onClick={handleCancelEdit}>Cancel</button>
            </td>
        </tr>
    )

    if (edit) {
        return (
            [recordEdit]
        )
    } else {
        return (
            [recordRow]
        )
    }
}
