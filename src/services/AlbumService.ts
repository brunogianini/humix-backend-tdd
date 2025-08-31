import { Album } from "@prisma/client";
import { CriarAlbumRequestDTO } from "../dtos/CriarAlbumRequestDTO";
import { AlbumRepository } from "../repositories/AlbumRepository";
import { CriarAlbumDTO } from "../dtos/CriarAlbumDTO";
import { searchAlbum } from "../utils/spotify";

export class AlbumService {
    constructor(private albumRepository: AlbumRepository) {}

    async criarAlbum(data: CriarAlbumRequestDTO): Promise<Album>{
        const albumExiste = await this.albumRepository.findByName(data.nome)

        if(albumExiste) throw new Error('Este álbum já foi criado')

        const spotifyPesquisa = await searchAlbum(data.nome, data.banda)
        const album: CriarAlbumDTO = {nome: spotifyPesquisa.nome, banda: spotifyPesquisa.banda, capa: spotifyPesquisa.capa, ano: new Date(spotifyPesquisa.ano)}

        return this.albumRepository.create(album)
    }
}