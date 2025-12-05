const { v4: uuid } = require("uuid");
const membersAdapter = require("../database/membersAdapter")

const getAllMembers = (filterParams) => {
    try {
        const allMembers = membersAdapter.getAllMembers(filterParams);
        return allMembers;
    } catch (error) {
        throw error;
    }
};

const getOneMember = (memberId) => {
    try {
        const member = membersAdapter.getOneMember(memberId)
        return member;
    } catch (error) {
        throw error;
    }
}

const createNewMember = (newMember) => {
    const memberToInsert = {
        ...newMember,
        id: uuid()
    }

    try {
        const createdMember = membersAdapter.createNewMember(memberToInsert);
        return createdMember;
    } catch (error) {
        throw error;
    }
}

const deleteOneMember = (memberId) => {
    try {
        membersAdapter.deleteOneMember(memberId);
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllMembers,
    getOneMember,
    createNewMember,
    deleteOneMember
};