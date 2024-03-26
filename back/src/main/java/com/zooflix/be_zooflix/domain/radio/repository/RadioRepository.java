package com.zooflix.be_zooflix.domain.radio.repository;

import com.zooflix.be_zooflix.domain.radio.entity.Radio;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RadioRepository  extends JpaRepository<Radio, Integer> {

}
