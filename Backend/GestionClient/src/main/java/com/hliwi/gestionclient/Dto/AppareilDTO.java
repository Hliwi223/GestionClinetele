package com.hliwi.gestionclient.Dto;


import com.hliwi.gestionclient.Models.Appareil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppareilDTO {

    private Long id;
    private String marque;
    private String modele;
    private String numSerie;
    private ClientDTO client;

    public static AppareilDTO fromEntity(Appareil entity) {
        return AppareilDTO.builder()
                .id(entity.getId())
                .marque(entity.getMarque())
                .modele(entity.getModele())
                .numSerie(entity.getNumSerie())
                .client(ClientDTO.fromEntity(entity.getClient()))
                .build();
    }
}
