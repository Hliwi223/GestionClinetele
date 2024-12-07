package com.hliwi.gestionclient.Dto;

import com.hliwi.gestionclient.Models.ReparationPiece;
import com.hliwi.gestionclient.Models.ReparationPieceCle;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReparationPieceDTO {
    private Long reparationId;
    private Long pieceId;
    private int qte;

    public static ReparationPieceDTO fromEntity(ReparationPiece entity) {
        return ReparationPieceDTO.builder()
                .reparationId(entity.getId().getReparationId())
                .pieceId(entity.getId().getPieceId())
                .qte(entity.getQte())
                .build();
    }

    public static ReparationPiece toEntity(ReparationPieceDTO dto) {
        ReparationPiece piece = new ReparationPiece();
        piece.setQte(dto.getQte());
        piece.setId(new ReparationPieceCle(dto.getReparationId(), dto.getPieceId()));
        return piece;
    }
}