package com.hliwi.gestionclient.contoller;

import com.hliwi.gestionclient.Dto.ClientDTO;
import com.hliwi.gestionclient.Dto.DemandeReparationDTO;

import com.hliwi.gestionclient.service.DemandeReparationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DemandeReparationController {

    private final DemandeReparationService demandeReparationService;


    @PostMapping("/demande-reparation")
    public DemandeReparationDTO addDemandeReparation(@RequestBody DemandeReparationDTO demandeReparationDTO) {
        return demandeReparationService.saveDemandeReparation(demandeReparationDTO);
    }
    @GetMapping("/getReparations")
    public List<DemandeReparationDTO> getAllDemandeReparations() {
        return demandeReparationService.getAllDemandeReparations();
    }

    @PutMapping("/update-status/{id}")
    public  DemandeReparationDTO updateReparationStatus(@PathVariable Long id, @RequestParam String status) {
        return demandeReparationService.updateReparationStatus(id, status).orElse(null);
    }
}
