import React, { useState } from 'react';
import {Typography, Button, Card, CardMedia, CardContent, Paper, Box, TextField, Container} from "@mui/material";
import {Link} from 'react-router-dom';
import bankImage from '../images/bank.png';
import bankCardImage from '../images/BankCard.jpg';
import bankMap from '../images/map.PNG';
import bankAdd from '../images/AddBank.jpg';

function BankAdd(props) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const responseAdd = await fetch('http://localhost:10000/app/add_bank', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, address: address })
            });
            const dataAdd = await responseAdd.json();

            if (dataAdd.status === 'success') {
                console.log("Bank dodany. Rozpoczynam aktualizację współrzędnych...");

                const responseUpdate = await fetch('http://localhost:10000/app/update_coordinates');
                const dataUpdate = await responseUpdate.json();

                alert(`Sukces! Dodano bank "${name}" i zaktualizowano mapę.`);

                setName("");
                setAddress("");
            } else {
                alert("Błąd dodawania: " + JSON.stringify(dataAdd));
            }
        } catch (e) {
            console.log(e);
            alert("Błąd połączenia z serwerem.");
        } finally {
            setIsProcessing(false);
        }
    }


    return (
        <div className='home'>

            <div className='menu'>

                <div className='menuLeft'>
                    <Link to='/'>
                        <img src={bankImage} className='bank_Icon' alt='Bank' />
                    </Link>

                    <Typography className='menuTitle' variant="h4" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Arial', letterSpacing: '4px' }}>
                            BANK<span style={{ color: '#7B61FF' }}>PORTAL</span>
                        </Typography>

                </div>
            </div>

                <div className='servicesBody'>
                    <div className='homeDescription'>
                        <Typography className='addTitle' variant="h4" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Arial', letterSpacing: '4px' }}>
                            ADD<span style={{ color: '#7B61FF' }}> BANK</span>
                        </Typography>

                    </div>

                    <div className="addBankBody">

                        <Paper elevation={3} className='formPaper'>

                            <Box component="form" onSubmit={handleSubmit} className='formBox'>
                                <TextField
                                    className='formInput'
                                    fullWidth
                                    label="Bank Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <TextField
                                    className='formInput' fullWidth label="Address (Street Number, City)" value={address} onChange={(e) => setAddress(e.target.value)} helperText="Example: Marszałkowska 1, Warszawa" required
                                />
                                <Button type="submit" variant='contained' fullWidth className='formButton'>
                                    SUBMIT
                                </Button>
                            </Box>
                        </Paper>
                    </div>





                </div>




        </div>
    );
}

export default BankAdd;