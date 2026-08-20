import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/contacts`;

export const getContacts = async () => {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch contacts");
    }

    return response.json();
};


export const getContactById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch contact");
    }

    return response.json();
};


export const markContactAsRead = async (id) => {
    const response = await fetch(`${API_URL}/${id}/read`, {
        method: "PUT"
    });

    if (!response.ok) {
        throw new Error("Failed to update contact");
    }

    return response.json();
};


export const deleteContact = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete contact");
    }

    return response.json();
};