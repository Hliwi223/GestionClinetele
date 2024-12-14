package com.hliwi.gestionclient.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hliwi.gestionclient.Dto.AppareilDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appareil {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String marque;
    private String modele;
    private String numSerie;

    @ManyToOne
    @JoinColumn(name = "client_id",nullable  = true)
    private Client client;

    @OneToMany(mappedBy = "appareil", cascade = CascadeType.ALL)
    private List<DemandeReparation> demandesReparation;

    public static Appareil toEntity(AppareilDTO dto) {
        return Appareil.builder()
                .id(dto.getId())
                .marque(dto.getMarque())
                .modele(dto.getModele())
                .numSerie(dto.getNumSerie())
                .client(dto.getClient() != null ? Client.toEntity(dto.getClient()) : null)
                .build();
    }
}
