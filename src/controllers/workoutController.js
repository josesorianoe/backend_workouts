const workoutService = require("../services/workoutService")

const getAllWorkouts = (req, resp) => {
    const {mode, name, limit, sort} = req.query;
    try {
        const allWorkouts = workoutService.getAllWorkouts({mode, name, limit, sort});

        if (allWorkouts.length === 0) {
            return resp.send({ status: "OK", data: {message: "No coinciden resultados"} });
        }

        resp.send({ status: "OK", data: allWorkouts });

    } catch (error) {
        resp.status(error?.status || 500)
        .send({status: "FAILED", data: {error: error?.message || error}})
    }
};

const getOneWorkout = (req, resp) => {
    const {
        params: { workoutId }
    } = req;

    if (!workoutId) {
        resp.status(400)
        .send({
            status: "FAILED",
            data: {error: "El parémetro ':workoutId' no puede estar vacío"}
        })
    }

    try {
        const workout = workoutService.getOneWorkout(workoutId);
        resp.send({ status: "OK", data: workout })
    } catch (error) {
        resp.status(error?.status || 500)
        .send({status: "FAILED", data: {error: error?.message || error}})
    }
}

const createNewWorkout = (req, resp) => {
    const { body } = req;

    if (
        !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips
    ) {
        resp.status(400).send({
            status: "FAILED",
            data: {
                error: "Falta alguno de los parámetros"
            }
        })
        return;
    }

    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips
    }

    const createdNewWorkout = workoutService.createNewWorkout(newWorkout);
    resp.status(201).send({ status: "OK", data: createdNewWorkout })
}

const updateOneWorkout = (req, resp) => {
    const {
        body,
        params: {workoutId},
    } = req;

    if (!workoutId) {
        resp.status(400)
        .send({
            status: "FAILED",
            data: {error: "El parámetro ':workoutId' no puede estar vacío"}
        })
    }

    try {
        const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
        resp.send({status: "OK", data: updatedWorkout});
    } catch (error) {
        resp.status(error?.status || 500)
        .send({status: "FAILED", data: {error: error?.message || error}})
    }
    
}

const deleteOneWorkout = (req, resp) => {
    const {
        params: { workoutId }
    } = req;

    if (!workoutId) {
        resp.status(400)
        .send({
            status: "FAILED",
            data: {error: "El parámetro ':workoutId' no puede estar vacío"}
        })
    }

    try { 
        const deletedOneWorkout = workoutService.deleteOneWorkout(workoutId);
        resp.send({ status: "OK", data: deletedOneWorkout })
    } catch (error) {
        resp.status(error?.status || 500)
        .send({status: "FAILED", data: {error: error?.message || error}})
    }

}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
};