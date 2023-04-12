
// info que entrega la api
interface responseJson {
    _id?: String;
    username?: String;
    fullname?: String;
    name_show_email?: String;
    email?: String;
    telephones?: String[];
    workplace?: String;
    password?: String;
    job_title?: String;
    entry_time?: String;
    break_time?: String;
    daily_working_hours?: String;
    role?: String;
    isActive?: Boolean;
    __v?: Number,
    isVacation?: String[];
    identity_document?: String;
    google_access_token?: String;
    google_refresh_token?: String;
    avatar?: String
}

// lo anterior va dentro de response
export interface  AuthResponse {
    response: responseJson;
}

export interface Usuario{
    avatar:String;
    email:String;
    fullName: String;
    username: String;
}
