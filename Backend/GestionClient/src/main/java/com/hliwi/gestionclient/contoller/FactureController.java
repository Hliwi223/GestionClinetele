package com.hliwi.gestionclient.contoller;

import com.hliwi.gestionclient.Dto.FactureDTO;
import com.hliwi.gestionclient.service.FactureService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
    @RequestMapping("/api/factures")
@RequiredArgsConstructor
public class FactureController {

    private final FactureService factureService;
    @PostMapping("/create")
    public FactureDTO createFacture(@RequestBody FactureDTO factureDTO) {
        return factureService.createFacture(factureDTO);
    }
    @GetMapping
    public List<FactureDTO> getAllFactures() {
        return factureService.getAllFactures();
    }


}
