const isInvalidDates = (data_inicio, data_fim, res) =>{
    if ((new Date(data_inicio) < new Date()) || new Date(data_fim) < new Date()) {
        res.status(400).json({ erro: true, field:'data_inicio' ,message: "A data não pode ser anterior ao dia de Hoje" })
        return true
    }
    if (data_fim) {
        if (new Date(data_inicio) > new Date(data_fim)) {
            res.status(400).json({ erro: true, field: 'data_inicio' ,message: "A Data de Início não pode ser maior que a data do término" })
            return true
        }
    }
}

module.exports = { isInvalidDates }