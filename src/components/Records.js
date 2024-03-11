import React, { useState, useEffect } from 'react'
// import { getJSON } from 'jquery'
import { transformDate } from '../utils/DateFormat'
import axios from 'axios'
import Record from './Record'
import RecordForm from './RecordForm'
import AmountBox from './AmountBox'

export default function Records() {
    const [records, setRecords] = useState([])

    const [error, setError] = useState(null)

    const [isLoaded, setIsLoaded] = useState(true)

    useEffect(() => {
        // --- jquery ---
        // getJSON("https://65e67ee9d7f0758a76e87953.mockapi.io/api/v1/records").then(
        //     response => {
        //         setRecords(response);
        //         setIsLoaded(false);
        //     },
        //     error => {
        //         setIsLoaded(false);
        //         setError(error);
        //     }
        // )

        // --- axios ---
        axios.get("https://65e67ee9d7f0758a76e87953.mockapi.io/api/v1/records").then(
            response => {
                // transform Date
                const transformedData = response.data.map(item => {
                    if (typeof item.date === 'string') {
                        return {
                            ...item
                        };
                    } else {
                        return {
                            ...item,
                            date: transformDate(item.date)
                        };
                    }
                });

                // Update
                setRecords(transformedData);
                setIsLoaded(false);
            }
        ).catch(
            error => {
                setIsLoaded(false);
                setError(error);
            })
    }, []);

    const addRecord = (record) => {
        // console.log(record);
        setError(null);
        setRecords([...records, record]);
        setIsLoaded(false);
    }

    const editRecord = (updatedRecord) => {
        setError(null);
        setIsLoaded(true);

        // Delay
        setTimeout(() => {
            const updatedRecords = records.map(record => {
                if (record.id === updatedRecord.id) {
                    return updatedRecord;
                } else {
                    return record;
                }
            });
            setRecords(updatedRecords);
            setIsLoaded(false);
        }, 50);
    }

    const deleteRecord = (id) => {
        setError(null);
        setIsLoaded(true);

        const updatedRecords = records.filter(record => record.id !== id);
        setRecords(updatedRecords);
        setIsLoaded(false);
    }

    // Calculate
    const calculateCredits = () => {
        let credits = records.filter((record) => {
            return record.amount >= 0;
        })

        return credits.reduce((prev, curr) => {
            return prev + Number.parseFloat(curr.amount, 0)
        }, 0)
    }

    const calculateDebits = () => {
        let debits = records.filter((record) => {
            return record.amount < 0;
        })

        return debits.reduce((prev, curr) => {
            return prev + Number.parseFloat(curr.amount, 0)
        }, 0)
    }

    const calculateBalance = () => {
        return calculateCredits() + calculateDebits()
    }

    let recordsComponent;

    if (error) {
        // --- jquery ---
        // return <div>Error: {error.responseText}</div>;
        recordsComponent = <div>Error: {error.message}</div>;
    } else if (isLoaded == true) {
        recordsComponent = <div>Loading...</div>;
    } else {
        recordsComponent = (
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {records.map((record, i) =>
                        <Record key={record.id} {...record}
                            handleUpdateRecord={editRecord} handleDeleteRecord={deleteRecord} />)}
                    {/* {...record} (spread operator) = {id: record.id} {date: record.date} {title: record.title} {amount: record.amount} */}
                </tbody>
            </table>
        )
    }

    return (
        <div>
            <h2>Records</h2>
            <div className="row mb-3">
                <AmountBox text="Credits" type="success" amount={calculateCredits()} />
                <AmountBox text="Debits" type="danger" amount={calculateDebits()} />
                <AmountBox text="Balance" type="info" amount={calculateBalance()} />
            </div>
            <RecordForm handleNewRecord={addRecord} /><br />
            {recordsComponent}
        </div>
    )
}
