package com.hliwi.gestionclient.Dto;

import com.hliwi.gestionclient.Models.Reparation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReparationDTO {

        private Long id;
        private LocalDate dateRep;
        private String description;
        private BigDecimal tarifHMO;
        private BigDecimal tempsMO;
        private DemandeReparationDTO demandeReparation;
        private List<ReparationPieceDTO> reparationPieces;

    public static ReparationDTO fromEntity(Reparation entity) {
        return ReparationDTO.builder()
                .id(entity.getId())
                .dateRep(entity.getDateRep())
                .description(entity.getDescription())
                .tarifHMO(entity.getTarifHMO())
                .tempsMO(entity.getTempsMO())
                .demandeReparation(DemandeReparationDTO.fromEntity(entity.getDemandeReparation()))
                .reparationPieces(entity.getReparationPieces().stream().map(ReparationPieceDTO::fromEntity).collect(Collectors.toList())).build();
    }

    public static Reparation toEntity(ReparationDTO dto) {
        Reparation reparation = new Reparation();
        reparation.setId(dto.getId());
        reparation.setDateRep(dto.getDateRep());
        reparation.setDescription(dto.getDescription());
        reparation.setTarifHMO(dto.getTarifHMO());
        reparation.setTempsMO(dto.getTempsMO());

        return reparation;
    }


    }
