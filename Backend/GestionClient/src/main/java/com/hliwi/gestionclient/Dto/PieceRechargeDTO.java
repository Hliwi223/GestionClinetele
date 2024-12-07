package com.hliwi.gestionclient.Dto;

import com.hliwi.gestionclient.Models.PieceRecharge;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PieceRechargeDTO {
    private Long id;
    private String code;
    private String nom;
    private BigDecimal prixAchat;
    private double prixHT;
    private double prixTTC;
    private TypePieceDTO typePiece;

    public static PieceRechargeDTO fromEntity(PieceRecharge entity) {
        return PieceRechargeDTO.builder()
                .id(entity.getId())
                .code(entity.getCode())
                .nom(entity.getNom())
                .prixAchat(entity.getPrixAchat())
                .prixHT(entity.getPrixHT())
                .prixTTC(entity.getPrixTTC())
                .typePiece(TypePieceDTO.fromEntity(entity.getTypePiece()))
                .build();
    }

    public static PieceRecharge toEntity(PieceRechargeDTO dto) {
        PieceRecharge pieceRecharge = new PieceRecharge();
        pieceRecharge.setId(dto.getId());
        pieceRecharge.setCode(dto.getCode());
        pieceRecharge.setNom(dto.getNom());
        pieceRecharge.setPrixAchat(dto.getPrixAchat());
        pieceRecharge.setPrixHT(dto.getPrixHT());
        pieceRecharge.setPrixTTC(dto.getPrixTTC());
        pieceRecharge.setTypePiece(TypePieceDTO.toEntity(dto.getTypePiece()));
        return pieceRecharge;
    }
}