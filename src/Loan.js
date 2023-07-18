import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Button } from '@mui/base';
import axios from 'axios';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';


function Loan(props) {
    const [period, setPeriod] = useState(20);
    const [loan, setLoan] = useState(2000);
    const [code, setCode] = useState("49002010965");
    const wrapperStyle = { width: 400, margin: 50 };
    const [grantedLoan, setGrantedLoan] = useState("");
    const options = [
        '49002010965', '49002010976', '49002010987', '49002010998'
    ];

    const defaultOption = options[0];


    const checkLoan = () => {
        axios.post("http://localhost:8080/inbank/loan", {
            "personalCode": code,
            "loan": loan,
            "period": period
        }).then((result) => setGrantedLoan(result.data)).catch((error) => console.log(error));
    }


    return (
        <div>
            <div style={wrapperStyle}>
                <h1>Inbank Loan {props.name}</h1>
                <p>Please select the period between 20 - 60</p>
                <Slider min={20} defaultValue={20} max={60} onChange={(value) => setPeriod(value)} />
                <p>{period}</p>
                <p>Please select the amount between 2000 - 10000</p>
                <Slider min={2000} defaultValue={2000} max={10000} onChange={(value) => setLoan(value)} />
                <p>{loan}</p>
                <Dropdown options={options} value={defaultOption} onChange={option => setCode(option.value)} placeholder="Select an option" />
                <Button onClick={checkLoan} style={{ marginTop: 10 }}>calculate</Button>
                {grantedLoan && <Card style={{ marginTop: 10 }} sx={{ minWidth: 275 }}>
                    {grantedLoan.granted ? <CardContent style={{ backgroundColor: "green", color: "white" }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            <p style={{ color: "white" }}>Good News!</p>
                        </Typography>
                        <Typography variant="body2">
                            Granted Loan : {grantedLoan.providedLoan}
                            <br />
                            Period : {grantedLoan.period}
                        </Typography>
                    </CardContent> :
                        <CardContent style={{ backgroundColor: "red" }}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                <p style={{ color: "white" }}>Unfortunately we couldn't provide any loan due to debt</p>
                            </Typography>
                        </CardContent>}
                </Card>}
            </div>
        </div>
    );
}

export default Loan;