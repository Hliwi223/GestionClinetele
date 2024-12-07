package com.hliwi.gestionclient.service;

import com.hliwi.gestionclient.Dto.TypePieceDTO;
import com.hliwi.gestionclient.Models.TypePiece;
import com.hliwi.gestionclient.repository.TypePieceRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TypePieceService {

    private final TypePieceRepository typePieceRepository;



    public List<TypePieceDTO> getAllTypePieces() {
        return typePieceRepository.findAll().stream()
                .map(TypePieceDTO::fromEntity)
                .collect(Collectors.toList());
    }

}
