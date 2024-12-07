package com.hliwi.gestionclient.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reparation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDate dateRep;
    private String description;
    private BigDecimal tarifHMO;
    private BigDecimal tempsMO;

    @OneToOne
    @JoinColumn(name = "demande_reparation_id", unique = true)
    private DemandeReparation demandeReparation;

    @OneToOne(mappedBy = "reparation", cascade = CascadeType.ALL)
    private Facture facture;

    @OneToMany(mappedBy = "reparation", cascade = CascadeType.ALL)
    private List<ReparationPiece> reparationPieces;

}
