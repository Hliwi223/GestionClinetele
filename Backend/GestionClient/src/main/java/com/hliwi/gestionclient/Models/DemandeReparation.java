package com.hliwi.gestionclient.Models;

import com.fasterxml.jackson.annotation.*;
import com.hliwi.gestionclient.Dto.DemandeReparationDTO;
import com.hliwi.gestionclient.enums.Etat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DemandeReparation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //@Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date_depot_appareil")
    private LocalDate dateDepotAppareil;
    //@Column(nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date_prevue_rep")
    private LocalDate datePrevueRep;

    @Enumerated(EnumType.STRING)
    private Etat etat;

    private String symptomesPanne;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "appareil_id")
    private Appareil appareil;

    @OneToOne(mappedBy = "demandeReparation", cascade = CascadeType.ALL)
    private Reparation reparation;

    public static DemandeReparation toEntity(DemandeReparationDTO dto) {
        return DemandeReparation.builder()
                .id(dto.getId())
                .dateDepotAppareil(dto.getDateDepotAppareil())
                .datePrevueRep(dto.getDatePrevueRep())
                .etat(dto.getEtat())
                .symptomesPanne(dto.getSymptomesPanne())
                .client(Client.toEntity(dto.getClient()))
                .appareil(Appareil.toEntity(dto.getAppareil()))
                .build();
    }

}
