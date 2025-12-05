const utils = require("../utils/utils");
const DB = require("./db.json");

const getAllWorkouts = (filterParams = {}) => {
  try {
    let workouts = DB.workouts;
    
    if (filterParams.mode) {
      workouts = workouts.filter((workout) => workout.mode.toLowerCase().includes(filterParams.mode))
    }

    if (filterParams.name) {
      workouts = workouts.filter((workout) => workout.name.toLowerCase().includes(filterParams.name))
    }

    if (filterParams.sort) { // order => asc o desc
      const orden = filterParams.sort === "asc" ? 1 : -1;
      
      // Se hace copia de workouts para que no afecte al original
      workouts = [...workouts].sort((a, b) => (Date.parse(a.createdAt) - Date.parse(b.createdAt)) * orden);
    }
    
    if (filterParams.limit) {
      workouts = workouts.slice(0, filterParams.limit);
    }

    return workouts;
  } catch (error) {
    throw {status: 500, message: error}
  }
}

const getOneWorkout = (workoutId) => {
  try {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
  
    if (!workout) {
      throw {
        status: 400,
        message: `No existe un workout con id ${workoutId}`
      }
    }
  
    return workout;
  } catch (error) {
    throw {status: error?.status || 500, message: error?.message || error}
  }
}

const createNewWorkout = (workoutToInsert) => {
  const idAlreadyExists = DB.workouts.findIndex((workout) => workout.name === workoutToInsert.name) > -1;

  if (idAlreadyExists) {
    throw {
      status: 400,
      message: `Ya existe un workout con el nombre ${workoutToInsert.name}`
    }
  }

  try {
    DB.workouts.push(workoutToInsert);
    utils.saveToDatabase(DB);
    return workoutToInsert;
  } catch (error) {
    throw { status: 500, message: error?.message || error }
  }

};

const updateOneWorkout = (workoutId, changes) => {
  try {
    const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === workoutId)

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `No se encuentra un workout con el id ${workoutId}`
      }
    }

    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", {timeZone: "UTC"})
    }

    DB.workouts[indexForUpdate] = updatedWorkout;
    utils.saveToDatabase(DB);
    return updatedWorkout;
  } catch (error) {
    throw {status: error?.status || 500, message: error?.message || error}
  }
}

const deleteOneWorkout = (workoutId) => {
  try {
    const index = DB.workouts.findIndex((workout) => workout.id === workoutId);
    if (index === -1) {
      throw {
        status: 400,
        message: `No se encuentra el workout con el id ${workoutId}`
      }
    }
  
    DB.workouts.splice(index, 1);
  
    DB.records = DB.records.filter((record) => record.workout !== workoutId);
  
    utils.saveToDatabase(DB);
  } catch (error) {
    throw {status: error?.status || 500, message: error?.message || error}
  }
  
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout
};