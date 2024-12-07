package com.hliwi.gestionclient.service;

import com.hliwi.gestionclient.Dto.AppareilDTO;
import com.hliwi.gestionclient.Dto.ClientDTO;
import com.hliwi.gestionclient.Models.Appareil;
import com.hliwi.gestionclient.repository.AppareilRepository;
import com.hliwi.gestionclient.repository.ClientRepository;
import com.hliwi.gestionclient.repository.DemandeReparationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppareilService {

    private final AppareilRepository appareilRepository;
    private final ClientRepository clientRepository;


    public List<AppareilDTO> getAllAppareils() {
        return appareilRepository.findAll().stream()
                .map(AppareilDTO::fromEntity)  // Convert all entities to DTOs
                .collect(Collectors.toList());
    }

    public AppareilDTO saveAppareil(AppareilDTO appareilDTO) {
        return AppareilDTO.fromEntity((appareilRepository.save(Appareil.toEntity(appareilDTO))));
    }
}



