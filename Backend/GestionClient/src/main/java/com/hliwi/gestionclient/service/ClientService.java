package com.hliwi.gestionclient.service;

import com.hliwi.gestionclient.Dto.ClientDTO;
import com.hliwi.gestionclient.Models.Client;
import com.hliwi.gestionclient.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

import static com.hliwi.gestionclient.Dto.ClientDTO.fromEntity;


@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;

    public List<ClientDTO> getAllClients() {
        return clientRepository.findAll().stream()
                .map(ClientDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public Client getClientById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
    }

    public boolean clientExistsByNom(String nom) {
        return clientRepository.findByNom(nom).isPresent();
    }

    public ClientDTO saveClient(ClientDTO clientDTO) {
        return fromEntity(clientRepository.save(Client.toEntity(clientDTO)));
    }

}