package com.hliwi.gestionclient.repository;

import com.hliwi.gestionclient.Models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client,Long> {
    List<Client> findByNom(String nom);
}
