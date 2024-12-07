package com.hliwi.gestionclient.repository;

import com.hliwi.gestionclient.Models.Appareil;
import com.hliwi.gestionclient.Models.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppareilRepository extends JpaRepository<Appareil, Long> {
    List<Appareil> findByMarque(String marque);
    List<Appareil> findByClient(Client client);
}
