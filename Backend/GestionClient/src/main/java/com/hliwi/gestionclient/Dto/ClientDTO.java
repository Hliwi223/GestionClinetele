package com.hliwi.gestionclient.Dto;

import com.hliwi.gestionclient.Models.Client;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientDTO  {

    private Long id;
    private String adresse;
    private String nom;
    private String numTel;
    private List<DemandeReparationDTO> demandesReparation;

    public static ClientDTO fromEntity(Client entity) {
        return  ClientDTO.builder()
                .id(entity.getId())
                .nom(entity.getNom())
                .adresse(entity.getAdresse())
                .numTel(entity.getNumTel()).build();
    }
}
