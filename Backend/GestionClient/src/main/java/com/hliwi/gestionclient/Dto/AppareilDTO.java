package com.hliwi.gestionclient.Dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hliwi.gestionclient.Models.Appareil;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
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
                .client(entity.getClient() != null ? ClientDTO.fromEntity(entity.getClient()) : null)
                .build();
    }
    public static AppareilDTO  fromEntitySave(Appareil entity) {
        return AppareilDTO.builder()
                .id(entity.getId())
                .marque(entity.getMarque())
                .modele(entity.getModele())
                .numSerie(entity.getNumSerie())
                .build();
    }
}
