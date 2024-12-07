package com.hliwi.gestionclient.Dto;

import com.hliwi.gestionclient.Models.PieceRecharge;
import com.hliwi.gestionclient.Models.TypePiece;
import com.hliwi.gestionclient.enums.PieceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TypePieceDTO {
    private Long id;
    private PieceType type;
    private double tarifH;

    public static TypePieceDTO fromEntity(TypePiece entity) {
        return TypePieceDTO.builder()
                .id(entity.getId())
                .type(entity.getType())
                .tarifH(entity.getTarifH())
                .build();
    }
    public static TypePiece toEntity(TypePieceDTO dto) {
        TypePiece entity = new TypePiece();
        entity.setId(dto.getId());
        entity.setType(dto.getType());
        entity.setTarifH(dto.getTarifH());
        return entity;
    }
}