package fr.sies.resalab.repository;

import fr.sies.resalab.domain.Salle;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Salle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalleRepository extends JpaRepository<Salle, Long> {
    @Query("select distinct salle from Salle salle left join fetch salle.configs")
    List<Salle> findAllWithEagerRelationships();

    @Query("select salle from Salle salle left join fetch salle.configs where salle.id =:id")
    Salle findOneWithEagerRelationships(@Param("id") Long id);

}
