package com.hliwi.gestionclient.service;


import com.hliwi.gestionclient.Dto.PieceRechargeDTO;
import com.hliwi.gestionclient.Dto.ReparationPieceDTO;
import com.hliwi.gestionclient.Models.PieceRecharge;
import com.hliwi.gestionclient.Models.ReparationPiece;
import com.hliwi.gestionclient.repository.ReparationPieceRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.hliwi.gestionclient.Dto.ReparationPieceDTO.fromEntity;

@Service
@RequiredArgsConstructor
public class ReparationPieceService {
    private final ReparationPieceRepository reparationPieceRepository;

    public ReparationPieceDTO saveReparationPiece(ReparationPieceDTO reparationPieceDTO) {
        ReparationPiece reparationPiece = ReparationPieceDTO.toEntity(reparationPieceDTO);
        return fromEntity(reparationPieceRepository.save(reparationPiece));
    }

    public List<ReparationPieceDTO> getAllReparationPieces() {
        return reparationPieceRepository.findAll().stream()
                .map(ReparationPieceDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
