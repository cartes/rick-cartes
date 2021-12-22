export interface Character {
    id: number,
    name: string,
    image: string,
    species: string,
    gender: string,
    created: string,
    status: string,
    episode: object,
    origin: any,
    [location: string]: any
}
