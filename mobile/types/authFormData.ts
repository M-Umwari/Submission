export interface signupFormData {
    fullName: string,
    email: string,
    password: string
}

export interface loginFormData {
    email: string
    password: string
}

export interface ApiResponse {
    message?: string,
    token?:string,
    data?:any
}

export interface User {
    id: string,
    fullName: string,
    email: string,
    role: 'user'|'counselor',
    createdAt: string
    profileImg: string
    hasTakenQuestionnaire: boolean
}

export interface changePasswordFormData {
    oldPassword: string,
    newPassword: string
}

export interface editProfileFormData {
    fullName: string,
    profileImg: string
}

export interface QuestionnaireFormData {
    mood: number,
    emotions: string[],
    energy: number,
    stress: number,
    interest: number,
    support: string,
}