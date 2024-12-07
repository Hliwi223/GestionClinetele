package com.hliwi.gestionclient.service;

import com.hliwi.gestionclient.Dto.ClientDTO;
import com.hliwi.gestionclient.Models.Client;
import com.hliwi.gestionclient.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;

    public List<ClientDTO> getAllClients() {
        return clientRepository.findAll().stream()
                .map(ClientDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public ClientDTO getClientById(Long id) {
        return clientRepository.findById(id)
                .map(ClientDTO::fromEntity)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
    }

    public ClientDTO saveClient(ClientDTO clientDTO) {
        return ClientDTO.fromEntity(clientRepository.save(Client.toEntity(clientDTO)));
    }

}