package com.hliwi.gestionclient.service;

import com.hliwi.gestionclient.Dto.PieceRechargeDTO;
import com.hliwi.gestionclient.Dto.ReparationDTO;
import com.hliwi.gestionclient.Models.PieceRecharge;
import com.hliwi.gestionclient.Models.Reparation;
import com.hliwi.gestionclient.repository.ReparationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.hliwi.gestionclient.Dto.ReparationDTO.fromEntity;

@Service
@RequiredArgsConstructor
public class ReparationService {
    private final ReparationRepository reparationRepository;



    public ReparationDTO createReparation(ReparationDTO reparationDTO) {
        Reparation reparation = ReparationDTO.toEntity(reparationDTO);
        return fromEntity(reparationRepository.save(reparation));
    }


    public List<ReparationDTO> getAllReparations() {
        List<Reparation> reparations = reparationRepository.findAll();
        return reparations.stream()
                .map(ReparationDTO::fromEntity)
                .collect(Collectors.toList());
    }


}
