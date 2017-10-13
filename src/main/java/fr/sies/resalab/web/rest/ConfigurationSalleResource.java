package fr.sies.resalab.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.sies.resalab.domain.ConfigurationSalle;

import fr.sies.resalab.repository.ConfigurationSalleRepository;
import fr.sies.resalab.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ConfigurationSalle.
 */
@RestController
@RequestMapping("/api")
public class ConfigurationSalleResource {

    private final Logger log = LoggerFactory.getLogger(ConfigurationSalleResource.class);

    private static final String ENTITY_NAME = "configurationSalle";

    private final ConfigurationSalleRepository configurationSalleRepository;

    public ConfigurationSalleResource(ConfigurationSalleRepository configurationSalleRepository) {
        this.configurationSalleRepository = configurationSalleRepository;
    }

    /**
     * POST  /configuration-salles : Create a new configurationSalle.
     *
     * @param configurationSalle the configurationSalle to create
     * @return the ResponseEntity with status 201 (Created) and with body the new configurationSalle, or with status 400 (Bad Request) if the configurationSalle has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/configuration-salles")
    @Timed
    public ResponseEntity<ConfigurationSalle> createConfigurationSalle(@Valid @RequestBody ConfigurationSalle configurationSalle) throws URISyntaxException {
        log.debug("REST request to save ConfigurationSalle : {}", configurationSalle);
        if (configurationSalle.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new configurationSalle cannot already have an ID")).body(null);
        }
        ConfigurationSalle result = configurationSalleRepository.save(configurationSalle);
        return ResponseEntity.created(new URI("/api/configuration-salles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /configuration-salles : Updates an existing configurationSalle.
     *
     * @param configurationSalle the configurationSalle to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated configurationSalle,
     * or with status 400 (Bad Request) if the configurationSalle is not valid,
     * or with status 500 (Internal Server Error) if the configurationSalle couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/configuration-salles")
    @Timed
    public ResponseEntity<ConfigurationSalle> updateConfigurationSalle(@Valid @RequestBody ConfigurationSalle configurationSalle) throws URISyntaxException {
        log.debug("REST request to update ConfigurationSalle : {}", configurationSalle);
        if (configurationSalle.getId() == null) {
            return createConfigurationSalle(configurationSalle);
        }
        ConfigurationSalle result = configurationSalleRepository.save(configurationSalle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, configurationSalle.getId().toString()))
            .body(result);
    }

    /**
     * GET  /configuration-salles : get all the configurationSalles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of configurationSalles in body
     */
    @GetMapping("/configuration-salles")
    @Timed
    public List<ConfigurationSalle> getAllConfigurationSalles() {
        log.debug("REST request to get all ConfigurationSalles");
        return configurationSalleRepository.findAll();
        }

    /**
     * GET  /configuration-salles/:id : get the "id" configurationSalle.
     *
     * @param id the id of the configurationSalle to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the configurationSalle, or with status 404 (Not Found)
     */
    @GetMapping("/configuration-salles/{id}")
    @Timed
    public ResponseEntity<ConfigurationSalle> getConfigurationSalle(@PathVariable Long id) {
        log.debug("REST request to get ConfigurationSalle : {}", id);
        ConfigurationSalle configurationSalle = configurationSalleRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(configurationSalle));
    }

    /**
     * DELETE  /configuration-salles/:id : delete the "id" configurationSalle.
     *
     * @param id the id of the configurationSalle to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/configuration-salles/{id}")
    @Timed
    public ResponseEntity<Void> deleteConfigurationSalle(@PathVariable Long id) {
        log.debug("REST request to delete ConfigurationSalle : {}", id);
        configurationSalleRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
