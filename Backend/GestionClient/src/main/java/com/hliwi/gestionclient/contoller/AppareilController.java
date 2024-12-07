package com.hliwi.gestionclient.contoller;

import com.hliwi.gestionclient.Dto.AppareilDTO;
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

}
