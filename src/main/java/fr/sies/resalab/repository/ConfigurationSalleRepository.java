package fr.sies.resalab.repository;

import fr.sies.resalab.domain.ConfigurationSalle;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ConfigurationSalle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConfigurationSalleRepository extends JpaRepository<ConfigurationSalle, Long> {

}
