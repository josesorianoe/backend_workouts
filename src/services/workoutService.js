const { v4: uuid } = require("uuid");
const workoutAdapter = require("../database/workoutAdapter")

const getAllWorkouts = (filterParams) => {
    try {
        const allWorkouts = workoutAdapter.getAllWorkouts(filterParams);
        return allWorkouts;
    } catch (error) {
        throw error;
    }
};

const getOneWorkout = (workoutId) => {
    try {
        const workout = workoutAdapter.getOneWorkout(workoutId)
        return workout;
    } catch (error) {
        throw error;
    }
}

const createNewWorkout = (newWorkout) => {
    const workutToInsert = {
        ...newWorkout,
        id: uuid(),
        createdAt: new Date().toLocaleDateString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleDateString("en-US", { timeZone: "UTC" }),
    }

    try {
        const createdWorkout = workoutAdapter.createNewWorkout(workutToInsert);
        return createdWorkout;
    } catch (error) {
        throw error;
    }
}

const updateOneWorkout = (workoutId, changes) => {
    
    try {
        const updatedWorkout = workoutAdapter.updateOneWorkout(workoutId, changes)
        return updatedWorkout;
    } catch (error) {
        throw error
    }
}

const deleteOneWorkout = (workoutId) => {
    try {
        workoutAdapter.deleteOneWorkout(workoutId);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
};