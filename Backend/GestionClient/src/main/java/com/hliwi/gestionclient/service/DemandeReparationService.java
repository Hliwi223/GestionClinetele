package com.hliwi.gestionclient.service;

import com.hliwi.gestionclient.Dto.AppareilDTO;
import com.hliwi.gestionclient.Dto.DemandeReparationDTO;
import com.hliwi.gestionclient.Models.Appareil;
import com.hliwi.gestionclient.Models.Client;
import com.hliwi.gestionclient.Models.DemandeReparation;
import com.hliwi.gestionclient.enums.Etat;
import com.hliwi.gestionclient.repository.DemandeReparationRepository;
import jakarta.persistence.TableGenerator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.hliwi.gestionclient.Dto.DemandeReparationDTO.fromEntity;
import static com.hliwi.gestionclient.Models.DemandeReparation.toEntity;

@Service
@RequiredArgsConstructor
public class DemandeReparationService {

    private final DemandeReparationRepository demandeReparationRepository;
    private final ClientService clientService;
    private final AppareilService  appareilService;

    @Transactional
    public DemandeReparationDTO saveDemandeReparation(DemandeReparationDTO demandeReparationDTO) {
        DemandeReparation demandeReparation = toEntity(demandeReparationDTO);

        if (demandeReparationDTO.getAppareil() == null || demandeReparationDTO.getAppareil().getId() == null) {
            throw new IllegalArgumentException("Appareil ID must be provided in DemandeReparationDTO");
        }
        Appareil appareil = appareilService.getAppareilById(demandeReparationDTO.getAppareil().getId());

        // Step 2: Set the Appareil and associated Client on DemandeReparation
        demandeReparation.setAppareil(appareil);
        demandeReparation.setClient(appareil.getClient());

        // Step 3: Save the DemandeReparation
        DemandeReparation savedDemandeReparation = demandeReparationRepository.save(demandeReparation);


        return fromEntity(demandeReparationRepository.save(savedDemandeReparation));
    }

    public List<DemandeReparationDTO> getAllDemandeReparations() {
        List<DemandeReparation> demandeReparations = demandeReparationRepository.findAll();
        return demandeReparations.stream()
                .map(DemandeReparationDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public Optional<DemandeReparationDTO> getDemandeReparationById(Long id) {
        Optional<DemandeReparation> demandeReparation = demandeReparationRepository.findById(id);
        return demandeReparation.map(DemandeReparationDTO::fromEntity);
    }

    public Optional<DemandeReparationDTO> updateReparationStatus(Long id, String status) {
        Optional<DemandeReparation> existingDemandeReparation = demandeReparationRepository.findById(id);

        if (existingDemandeReparation.isPresent()) {
            DemandeReparation demandeReparation = existingDemandeReparation.get();


            try {
                Etat etat = Etat.valueOf(status);
                demandeReparation.setEtat(etat);

                return Optional.of(fromEntity(demandeReparationRepository.save(demandeReparation)));
            } catch (IllegalArgumentException e) {
                return Optional.empty();
            }
        }

        return Optional.empty();
    }
}
