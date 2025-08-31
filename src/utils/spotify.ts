import { Prisma } from "@prisma/client"

async function getSpotifyAuthToken(): Promise<String> {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa("47d629387eff4cc2a731e7f2c290302e:5bcf17b2ac36460480687f83171004ae")
        },
        body: 'grant_type=client_credentials'
    })

    const data = await response.json()
    return data.access_token
}

export async function searchAlbum(nome: String, banda: String): Promise<Prisma.AlbumCreateInput> {
    const token = await getSpotifyAuthToken()

    const response = await fetch(`https://api.spotify.com/v1/search?q=${nome}${banda}&type=album&limit=1`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    const data = await response.json()
    const payload = data.albums.items[0]
    const album: Prisma.AlbumCreateInput = {nome: payload.name, banda: payload.artists[0].name, capa: payload.images[0].url, ano: payload.release_date}

    return album
}