import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { TeamMemberForm, Project, TeamMember, teamMembersSchema } from "../types";

export async function findUserByEmail({projectId, formData} : {projectId: Project['_id'], formData: TeamMemberForm}) {

    try {
        const url = `/projects/${projectId}/team/find`
        const { data } = await api.post(url, formData)
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Implement the findUsersByEmail function. This function should find all users whose email contains the email parameter. The search should be case insensitive. The function should return an array of objects with the id, email, and name of the users found. If no users are found, the function should throw an error with the message "Usuario No Encontrado".
export async function findUsersByEmail({projectId, formData} : {projectId: Project['_id'], formData: TeamMemberForm}) {
    try {
        console.log(formData)
        const url = `/projects/${projectId}/team/find/all`
        const { data } = await api.post(url, formData)
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addUserToProject({projectId, id} : {projectId: Project['_id'], id: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api.post(url, {id})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeUserFromProject({projectId, userId} : {projectId: Project['_id'], userId: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team/${userId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectTeam(projectId : Project['_id']) {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api(url)
        const response = teamMembersSchema.safeParse(data)

        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
