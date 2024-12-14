package com.hliwi.gestionclient.contoller;

import com.hliwi.gestionclient.Dto.AppareilDTO;
import com.hliwi.gestionclient.Dto.ClientDTO;
import com.hliwi.gestionclient.Dto.DemandeReparationDTO;
import com.hliwi.gestionclient.service.AppareilService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AppareilController {

    private final AppareilService appareilService;


    @GetMapping("/appareils")
    public List<AppareilDTO> getAllAppareils() {
        return appareilService.getAllAppareils();
    }

    @PostMapping("/addAppareil")
    public AppareilDTO addAppareil(@RequestBody AppareilDTO appareilDTO) {
        return appareilService.saveAppareil(appareilDTO);
    }

    @PutMapping("/update-appareil/{id}")
    public AppareilDTO updateAppareilCientId(@PathVariable Long id, @RequestBody ClientDTO clientDTO){
        return appareilService.updateAppareilCientId(id,clientDTO).orElse(null);
    }

    @GetMapping("/exists/{numSerie}")
    public boolean existsByNumSerie(@PathVariable String numSerie) {
        if (numSerie == null || numSerie.isEmpty()) {
            throw new IllegalArgumentException("NumSerie cannot be null or empty");
        }
        return appareilService.existsByNumSerie(numSerie);
    }

}
