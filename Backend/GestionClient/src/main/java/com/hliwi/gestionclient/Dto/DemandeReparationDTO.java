package com.hliwi.gestionclient.Dto;

import com.hliwi.gestionclient.Models.DemandeReparation;
import com.hliwi.gestionclient.enums.Etat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DemandeReparationDTO {
    private Long id;
    private LocalDate dateDepotAppareil;
    private LocalDate datePrevueRep;
    private Etat etat;
    private String symptomesPanne;
    private ClientDTO client;
    private AppareilDTO appareil;

    public static DemandeReparationDTO fromEntity(DemandeReparation entity) {
        return DemandeReparationDTO.builder()
                .id(entity.getId())
                .dateDepotAppareil(entity.getDateDepotAppareil())
                .datePrevueRep(entity.getDatePrevueRep())
                .etat(entity.getEtat())
                .symptomesPanne(entity.getSymptomesPanne())
                .client(ClientDTO.fromEntity(entity.getClient()))
                .appareil(AppareilDTO.fromEntity(entity.getAppareil()))
                .build();
    }
}
