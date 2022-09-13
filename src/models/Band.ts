/* nome, gênero musical principal a qual ela se identifica e o nome de um responsável 
(que pode ser qualquer membro dela). Não podem existir duas bandas com o mesmo nome.
 Somente administradores podem registrar bandas. Faça ao menos dois testes para checar se os dados estão corretos,
  sendo um em caso de erro e outro em caso de acerto. */


  export interface Band {
    id: string,
    name: string,
    music_genre: string,
    responsible: string
   // token: string
}

export interface BandInputDTO {
    name: string,
    music_genre: string,
    responsible: string
    token:string
}