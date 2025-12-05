const membersService = require("../services/membersService")
const bcrypt = require('bcryptjs');

const getAllMembers = (req, resp) => {
    const {gender, name, limit, sort} = req.query;
    try {
        const allMembers = membersService.getAllMembers({gender, name, limit, sort});

        if (allMembers.length === 0) {
            return resp.send({ status: "OK", data: {message: "No coinciden resultados"} });
        }

        resp.send({ status: "OK", data: allMembers });

    } catch (error) {
        resp.status(error?.status || 500)
        .send({status: "FAILED", data: {error: error?.message || error}})
    }
};

const getOneMember = (req, resp) => {
    const {
        params: { memberId }
    } = req;

    if (!memberId) {
        resp.status(400)
        .send({
            status: "FAILED",
            data: {error: "El parémetro ':memberId' no puede estar vacío"}
        })
    }

    try {
        const member = membersService.getOneMember(memberId);
        resp.send({ status: "OK", data: member })
    } catch (error) {
        resp.status(error?.status || 500)
        .send({status: "FAILED", data: {error: error?.message || error}})
    }
}

const createNewMember = (req, resp) => {
    const { body } = req;

    if (
        !body.name ||
        !body.gender ||
        !body.dateOfBirth ||
        !body.email ||
        !body.password
    ) {
        resp.status(400).send({
            status: "FAILED",
            data: {
                error: "Falta alguno de los parámetros"
            }
        })
        return;
    }

     
    const passwordHash = bcrypt.hashSync(body.password, bcrypt.genSaltSync());

    const newMember = {
        name: body.name,
        gender: body.gender,
        dateOfBirth: body.dateOfBirth,
        email: body.email,
        password: passwordHash
    }

    const createdNewMember = membersService.createNewMember(newMember);
    resp.status(201).send({ status: "OK", data: createdNewMember })
}

const deleteOneMember = (req, resp) => {
    const {
        params: { memberId }
    } = req;

    if (!memberId) {
        resp.status(400)
        .send({
            status: "FAILED",
            data: {error: "El parámetro ':memberId' no puede estar vacío"}
        })
    }

    try { 
        const deletedOneMember = membersService.deleteOneMember(memberId);
        resp.send({ status: "OK", data: deletedOneMember })
    } catch (error) {
        resp.status(error?.status || 500)
        .send({status: "FAILED", data: {error: error?.message || error}})
    }

}

module.exports = {
    getAllMembers,
    getOneMember,
    createNewMember,
    deleteOneMember
};