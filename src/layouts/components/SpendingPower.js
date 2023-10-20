import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

const SpendingPowerCalculator = () => {
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [tradeIn, setTradeIn] = useState(0);
  const [term, setTerm] = useState(12); // Set default term to 12 months
  const [interestRate, setInterestRate] = useState(0);
  const [spendingPower, setSpendingPower] = useState(0);

  const calculateSpendingPower = () => {
    const monthlyInterestRate = interestRate / 12 / 100;
    const numberOfPayments = term;
    const spendingPower =
      (monthlyPayment * ((1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments)) / monthlyInterestRate)) +
      downPayment +
      tradeIn;
  
    setSpendingPower(spendingPower);
  };
  
  

  return (
    
    <Card elevation={3} variant="outlined" >
      <CardContent>
        <Box p={3}>
          <Typography variant="h5" gutterBottom align="center" style={{ color: 'white' }}>
            Spending Power Calculator
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <InputLabel style={{ color: 'white' }}>Monthly Payment</InputLabel>
            <TextField
              fullWidth
              type="number"
              variant="outlined"
              sx={{ width: '25%' }}
              onChange={(e) => setMonthlyPayment(parseFloat(e.target.value))}
            />
            <InputLabel style={{ color: 'white' }}>Down Payment</InputLabel>
            <TextField
              fullWidth
              type="number"
              variant="outlined"
              sx={{ width: '25%' }}
              onChange={(e) => setDownPayment(parseFloat(e.target.value))}
            />
            <InputLabel style={{ color: 'white' }}>Trade-In Value</InputLabel>
            <TextField
              fullWidth
              type="number"
              variant="outlined"
              sx={{ width: '25%' }}
              onChange={(e) => setTradeIn(parseFloat(e.target.value))}
            />
            <Box display="flex" flexDirection="column" gap={2}>
              <InputLabel style={{ color: 'white' }}>Term (Months)</InputLabel>
              <Select
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                variant="outlined"
                sx={{ width: '25%' }}
              >
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={36}>36</MenuItem>
                <MenuItem value={48}>48</MenuItem>
                <MenuItem value={60}>60</MenuItem>
                <MenuItem value={72}>72</MenuItem>
                <MenuItem value={84}>84</MenuItem>
              </Select>
            </Box>
            <InputLabel style={{ color: 'white' }}>Interest Rate (%)</InputLabel>
            <TextField
              type="number"
              variant="outlined"
              sx={{ width: '25%' }}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="center">
          <Button
  sx={{ width: '20%', backgroundColor: 'primary', color: 'black' }}
  variant="contained"
  color="primary"
  onClick={calculateSpendingPower}
>
              Calculate Spending Power
            </Button>
          </Box>
          {spendingPower > 0 && (
            <Typography variant="h6" align="center" mt={2} style={{ color: 'white' }}>
            Spending Power: ${spendingPower.toFixed(2)}
          </Typography>
          
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SpendingPowerCalculator;
