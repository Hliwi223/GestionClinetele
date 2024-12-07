package com.hliwi.gestionclient.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReparationPieceCleDTO {
    private Long reparationId;
    private Long pieceId;
}