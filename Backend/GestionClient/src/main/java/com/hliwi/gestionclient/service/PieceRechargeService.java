package com.hliwi.gestionclient.service;

import com.hliwi.gestionclient.Dto.FactureDTO;
import com.hliwi.gestionclient.Dto.PieceRechargeDTO;
import com.hliwi.gestionclient.Models.Facture;
import com.hliwi.gestionclient.Models.PieceRecharge;
import com.hliwi.gestionclient.repository.PieceRechargeRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.hliwi.gestionclient.Dto.PieceRechargeDTO.fromEntity;

@Service
@RequiredArgsConstructor
public class PieceRechargeService {

    private final PieceRechargeRepository pieceRechargeRepository;



    public PieceRechargeDTO savePieceRecharge(PieceRechargeDTO pieceRechargeDTO) {
        PieceRecharge pieceRecharge = PieceRechargeDTO.toEntity(pieceRechargeDTO);
        return fromEntity(pieceRechargeRepository.save(pieceRecharge));
    }
    public List<PieceRechargeDTO> getAllPieceRecharges() {
        return pieceRechargeRepository.findAll().stream()
                .map(PieceRechargeDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
