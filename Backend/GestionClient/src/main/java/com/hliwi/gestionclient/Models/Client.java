package com.hliwi.gestionclient.Models;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hliwi.gestionclient.Dto.ClientDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String adresse;
    private String nom;
    private String numTel;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<DemandeReparation> demandesReparation;


    public static Client  toEntity(ClientDTO Dto){
        if(Dto==null)return null;
        return Client.builder()
                .id(Dto.getId())
                .nom(Dto.getNom())
                .adresse(Dto.getAdresse())
                .numTel(Dto.getNumTel()).build();
    }
}
