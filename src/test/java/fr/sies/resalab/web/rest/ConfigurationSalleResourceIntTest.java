package fr.sies.resalab.web.rest;

import fr.sies.resalab.ResaLabApp;

import fr.sies.resalab.domain.ConfigurationSalle;
import fr.sies.resalab.repository.ConfigurationSalleRepository;
import fr.sies.resalab.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ConfigurationSalleResource REST controller.
 *
 * @see ConfigurationSalleResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ResaLabApp.class)
public class ConfigurationSalleResourceIntTest {

    private static final String DEFAULT_CONFIG_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CONFIG_NAME = "BBBBBBBBBB";

    @Autowired
    private ConfigurationSalleRepository configurationSalleRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConfigurationSalleMockMvc;

    private ConfigurationSalle configurationSalle;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConfigurationSalleResource configurationSalleResource = new ConfigurationSalleResource(configurationSalleRepository);
        this.restConfigurationSalleMockMvc = MockMvcBuilders.standaloneSetup(configurationSalleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ConfigurationSalle createEntity(EntityManager em) {
        ConfigurationSalle configurationSalle = new ConfigurationSalle()
            .configName(DEFAULT_CONFIG_NAME);
        return configurationSalle;
    }

    @Before
    public void initTest() {
        configurationSalle = createEntity(em);
    }

    @Test
    @Transactional
    public void createConfigurationSalle() throws Exception {
        int databaseSizeBeforeCreate = configurationSalleRepository.findAll().size();

        // Create the ConfigurationSalle
        restConfigurationSalleMockMvc.perform(post("/api/configuration-salles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configurationSalle)))
            .andExpect(status().isCreated());

        // Validate the ConfigurationSalle in the database
        List<ConfigurationSalle> configurationSalleList = configurationSalleRepository.findAll();
        assertThat(configurationSalleList).hasSize(databaseSizeBeforeCreate + 1);
        ConfigurationSalle testConfigurationSalle = configurationSalleList.get(configurationSalleList.size() - 1);
        assertThat(testConfigurationSalle.getConfigName()).isEqualTo(DEFAULT_CONFIG_NAME);
    }

    @Test
    @Transactional
    public void createConfigurationSalleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = configurationSalleRepository.findAll().size();

        // Create the ConfigurationSalle with an existing ID
        configurationSalle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConfigurationSalleMockMvc.perform(post("/api/configuration-salles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configurationSalle)))
            .andExpect(status().isBadRequest());

        // Validate the ConfigurationSalle in the database
        List<ConfigurationSalle> configurationSalleList = configurationSalleRepository.findAll();
        assertThat(configurationSalleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkConfigNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = configurationSalleRepository.findAll().size();
        // set the field null
        configurationSalle.setConfigName(null);

        // Create the ConfigurationSalle, which fails.

        restConfigurationSalleMockMvc.perform(post("/api/configuration-salles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configurationSalle)))
            .andExpect(status().isBadRequest());

        List<ConfigurationSalle> configurationSalleList = configurationSalleRepository.findAll();
        assertThat(configurationSalleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConfigurationSalles() throws Exception {
        // Initialize the database
        configurationSalleRepository.saveAndFlush(configurationSalle);

        // Get all the configurationSalleList
        restConfigurationSalleMockMvc.perform(get("/api/configuration-salles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(configurationSalle.getId().intValue())))
            .andExpect(jsonPath("$.[*].configName").value(hasItem(DEFAULT_CONFIG_NAME.toString())));
    }

    @Test
    @Transactional
    public void getConfigurationSalle() throws Exception {
        // Initialize the database
        configurationSalleRepository.saveAndFlush(configurationSalle);

        // Get the configurationSalle
        restConfigurationSalleMockMvc.perform(get("/api/configuration-salles/{id}", configurationSalle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(configurationSalle.getId().intValue()))
            .andExpect(jsonPath("$.configName").value(DEFAULT_CONFIG_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingConfigurationSalle() throws Exception {
        // Get the configurationSalle
        restConfigurationSalleMockMvc.perform(get("/api/configuration-salles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConfigurationSalle() throws Exception {
        // Initialize the database
        configurationSalleRepository.saveAndFlush(configurationSalle);
        int databaseSizeBeforeUpdate = configurationSalleRepository.findAll().size();

        // Update the configurationSalle
        ConfigurationSalle updatedConfigurationSalle = configurationSalleRepository.findOne(configurationSalle.getId());
        updatedConfigurationSalle
            .configName(UPDATED_CONFIG_NAME);

        restConfigurationSalleMockMvc.perform(put("/api/configuration-salles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConfigurationSalle)))
            .andExpect(status().isOk());

        // Validate the ConfigurationSalle in the database
        List<ConfigurationSalle> configurationSalleList = configurationSalleRepository.findAll();
        assertThat(configurationSalleList).hasSize(databaseSizeBeforeUpdate);
        ConfigurationSalle testConfigurationSalle = configurationSalleList.get(configurationSalleList.size() - 1);
        assertThat(testConfigurationSalle.getConfigName()).isEqualTo(UPDATED_CONFIG_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingConfigurationSalle() throws Exception {
        int databaseSizeBeforeUpdate = configurationSalleRepository.findAll().size();

        // Create the ConfigurationSalle

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restConfigurationSalleMockMvc.perform(put("/api/configuration-salles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configurationSalle)))
            .andExpect(status().isCreated());

        // Validate the ConfigurationSalle in the database
        List<ConfigurationSalle> configurationSalleList = configurationSalleRepository.findAll();
        assertThat(configurationSalleList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteConfigurationSalle() throws Exception {
        // Initialize the database
        configurationSalleRepository.saveAndFlush(configurationSalle);
        int databaseSizeBeforeDelete = configurationSalleRepository.findAll().size();

        // Get the configurationSalle
        restConfigurationSalleMockMvc.perform(delete("/api/configuration-salles/{id}", configurationSalle.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ConfigurationSalle> configurationSalleList = configurationSalleRepository.findAll();
        assertThat(configurationSalleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConfigurationSalle.class);
        ConfigurationSalle configurationSalle1 = new ConfigurationSalle();
        configurationSalle1.setId(1L);
        ConfigurationSalle configurationSalle2 = new ConfigurationSalle();
        configurationSalle2.setId(configurationSalle1.getId());
        assertThat(configurationSalle1).isEqualTo(configurationSalle2);
        configurationSalle2.setId(2L);
        assertThat(configurationSalle1).isNotEqualTo(configurationSalle2);
        configurationSalle1.setId(null);
        assertThat(configurationSalle1).isNotEqualTo(configurationSalle2);
    }
}
