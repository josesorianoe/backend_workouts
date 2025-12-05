const utils = require("../utils/utils");
const DB = require("./db.json");

const getAllMembers = (filterParams = {}) => {
  try {
    let members = DB.members;
    
    if (filterParams.gender) {
        members = members.filter((member) => member.gender.toLowerCase().includes(filterParams.gender))
    }

    if (filterParams.name) {
      members = members.filter((member) => member.name.toLowerCase().includes(filterParams.name))
    }

    if (filterParams.sort) { // order => asc o desc
      const orden = filterParams.sort === "asc" ? 1 : -1;
      
      // Se hace copia de members para que no afecte al original
      members = [...members].sort((a, b) => {
        // Cambiar formato de fecha
        let fechaA = utils.formatearFechaUS(a.dateOfBirth);
        let fechaB = utils.formatearFechaUS(b.dateOfBirth);
        
        return (Date.parse(fechaA) - Date.parse(fechaB)) * orden;
      });
    }
    
    if (filterParams.limit) {
      members = members.slice(0, filterParams.limit);
    }

    return members;
  } catch (error) {
    throw {status: 500, message: error}
  }
}

const getOneMember = (memberId) => {
  try {
    const member = DB.members.find((member) => member.id === memberId);
  
    if (!member) {
      throw {
        status: 400,
        message: `No existe un miembro con id ${memberId}`
      }
    }
  
    return member;
  } catch (error) {
    throw {status: error?.status || 500, message: error?.message || error}
  }
}

const createNewMember = (memberToInsert) => {
  const emailAlreadyExists = DB.members.findIndex((member) => member.email === memberToInsert.email) > -1;

  if (emailAlreadyExists) {
    throw {
      status: 400,
      message: `Ya existe un miembro con el email ${memberToInsert.email}`
    }
  }

  try {
    DB.members.push(memberToInsert);
    utils.saveToDatabase(DB);
    return memberToInsert;
  } catch (error) {
    throw { status: 500, message: error?.message || error }
  }

};

const deleteOneMember = (memberId) => {
  try {
    const index = DB.members.findIndex((member) => member.id === memberId);
    if (index === -1) {
      throw {
        status: 400,
        message: `No se encuentra el miembro con el id ${memberId}`
      }
    }
  
    DB.members.splice(index, 1);
  
    utils.saveToDatabase(DB);
  } catch (error) {
    throw {status: error?.status || 500, message: error?.message || error}
  }
  
};

module.exports = {
    getAllMembers,
    getOneMember,
    createNewMember,
    deleteOneMember
}