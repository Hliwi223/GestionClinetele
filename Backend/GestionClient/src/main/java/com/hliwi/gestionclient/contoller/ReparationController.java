package com.hliwi.gestionclient.contoller;

import com.hliwi.gestionclient.Dto.ReparationDTO;
import com.hliwi.gestionclient.service.ReparationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reparations")
@RequiredArgsConstructor
public class ReparationController {

    private final ReparationService reparationService;


    @PostMapping("/create")
    public ReparationDTO  createReparation(@RequestBody ReparationDTO reparationDTO) {
        return reparationService.createReparation(reparationDTO);
    }
    @GetMapping
    public List<ReparationDTO> getAllReparations() {
        return reparationService.getAllReparations();
    }

}
