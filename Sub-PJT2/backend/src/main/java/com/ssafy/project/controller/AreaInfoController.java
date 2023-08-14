package com.ssafy.project.controller;

import com.ssafy.project.dto.response.AreaGugunDto;
import com.ssafy.project.dto.response.AreaSidoDto;
import com.ssafy.project.service.AreaInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/areas", produces = "application/json; charset=utf8")
public class AreaInfoController {
    private final AreaInfoService areaInfoService;

    @GetMapping()
    protected List<AreaSidoDto> getSidoAreaInfos() throws Exception {
        return areaInfoService.getSidoAreaInfos();
    }

    @GetMapping("/{sidocode}")
    protected List<AreaGugunDto> getGugunAreaInfosBySido(@PathVariable int sidocode) throws Exception {
        return areaInfoService.getGugunAreaInfos(sidocode);
    }

}
