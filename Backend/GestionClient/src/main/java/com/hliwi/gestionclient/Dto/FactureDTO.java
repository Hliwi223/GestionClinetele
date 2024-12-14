package com.hliwi.gestionclient.Dto;

import com.hliwi.gestionclient.Models.Facture;
import com.hliwi.gestionclient.Models.Reparation;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FactureDTO {

    private Long id;
    private LocalDate date;
    private BigDecimal montantTotal;
    private String numero;
    private ReparationDTO reparation;

    public static FactureDTO fromEntity(Facture entity) {
        return FactureDTO.builder()
                .id(entity.getId())
                .date(entity.getDate())
                .montantTotal(entity.getMontantTotal())
                .numero(entity.getNumero())
                .reparation(ReparationDTO.fromEntity(entity.getReparation()))
                .build();
    }

    public static Facture toEntity(FactureDTO dto) {
        Facture facture = new Facture();
        facture.setId(dto.getId());
        facture.setDate(dto.getDate());
        facture.setMontantTotal(dto.getMontantTotal());
        facture.setNumero(dto.getNumero());


        if (dto.getReparation() != null) {
            Reparation reparation = new Reparation();
            reparation.setId(dto.getReparation().getId());
            facture.setReparation(reparation);
        }
        return facture;
    }

}
