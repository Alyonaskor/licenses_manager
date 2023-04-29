const getSchedule = (req, res) => {
    res.send(` Get Schedule  Route`)
}
const createSchedule = (req, res) => {
    res.send(`Create Schedule Route`)
}


module.exports = {
    getSchedule,
    createSchedule,
} 