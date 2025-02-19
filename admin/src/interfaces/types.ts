export interface Image {
    publicId: string,
    url: string
}


export interface About {
    head: string,
    body: string
}

export interface ProfileTypes {
    fullName: string,
    phoneNumber: number | null,
    email: string,
    userName: string,
    tagline: string,
    image: Image,
    backgroundImage: Image,
    logo: Image,
    about: About,
}
