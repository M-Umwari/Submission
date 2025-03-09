import { User } from "./authFormData";

export interface Group {
    id: string,
    name: string,
    users: User[]
}

export interface createGroupFormData {
    name: string
}

export interface groupFormData {
    groupId: string
}