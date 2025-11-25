const express = require("express");
const cors = require("cors");

const v1WorkoutRouter = require("./v1/routes/workoutRoutes")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());


// app.get("/", (req, resp) => {
//     resp.send("<h1>Servidor básico funcionando</h1>");
// });

app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
})