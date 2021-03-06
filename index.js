import express from 'express';
import cors from 'cors';

const hoje = new Date();
const hojeFormatado = hoje.toLocaleDateString();

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];

const holidayValidation = holidays.filter(holiday => {
    if (holiday.date === hojeFormatado) return true;
    else return false;
});

const app = express();

app.use(cors());

app.get('/holidays', (req, res) => {
    res.send(holidays);
});

app.get('/is-today-holiday', (req, res) => {

    if (holidayValidation.length === 0) {
        res.send("Não, hoje não é feriado");
    } else {
        res.send(`Sim, hoje é ${holidayValidation[0].name}`);
    }
});

app.get('/holidays/:monthNumber', (req, res) => {
    const mes = req.params.monthNumber;

    const monthlyHoliday = holidays.filter(holiday => {
        const holidayMonth = holiday.date.split('/');
        if (holidayMonth[0] === mes) return true;
        else return false;
    })

    res.send(monthlyHoliday.length === 0 ? 'Não há feriados neste mês' : monthlyHoliday);
})

app.listen(4000, () => {
    console.log('Server on');
});