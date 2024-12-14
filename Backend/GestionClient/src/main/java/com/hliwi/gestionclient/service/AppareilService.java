package com.hliwi.gestionclient.service;

import com.hliwi.gestionclient.Dto.AppareilDTO;
import com.hliwi.gestionclient.Dto.ClientDTO;
import com.hliwi.gestionclient.Models.Appareil;
import com.hliwi.gestionclient.Models.Client;
import com.hliwi.gestionclient.repository.AppareilRepository;
import com.hliwi.gestionclient.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.hliwi.gestionclient.Dto.AppareilDTO.fromEntity;

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
        return AppareilDTO.fromEntitySave((appareilRepository.save(Appareil.toEntity(appareilDTO))));
    }
    public Appareil getAppareilById(Long id) {
        return appareilRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appareil not found with id: " + id));
    }

    public Optional<AppareilDTO> updateAppareilCientId(Long id, ClientDTO client) {
        Optional<Appareil> existingAppareil = appareilRepository.findById(id);

        if (existingAppareil.isPresent()) {
            Appareil appareil = existingAppareil.get();

            try {
                Client c = Client.toEntity(client);
                appareil.setClient(c);

                return Optional.of(fromEntity(appareilRepository.save(appareil)));
            } catch (IllegalArgumentException e) {
                return Optional.empty();
            }
        }
        return Optional.empty();
    }
    public boolean existsByNumSerie(String numSerie) {
        return appareilRepository.existsByNumSerie(numSerie);
    }
}



