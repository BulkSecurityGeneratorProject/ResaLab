package fr.sies.resalab.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import fr.sies.resalab.domain.enumeration.HeureMinutes;

/**
 * A Reservation.
 */
@Entity
@Table(name = "reservation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Reservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jour_resa", nullable = false)
    private LocalDate jourResa;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "heure_debut", nullable = false)
    private HeureMinutes heureDebut;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "heure_fin", nullable = false)
    private HeureMinutes heureFin;

    @Column(name = "nb_personne")
    private Integer nbPersonne;

    @NotNull
    @Column(name = "objet", nullable = false)
    private String objet;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "reservation")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Salle> salleReservees = new HashSet<>();

    @OneToMany(mappedBy = "reservation")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Agent> reserveurs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getJourResa() {
        return jourResa;
    }

    public Reservation jourResa(LocalDate jourResa) {
        this.jourResa = jourResa;
        return this;
    }

    public void setJourResa(LocalDate jourResa) {
        this.jourResa = jourResa;
    }

    public HeureMinutes getHeureDebut() {
        return heureDebut;
    }

    public Reservation heureDebut(HeureMinutes heureDebut) {
        this.heureDebut = heureDebut;
        return this;
    }

    public void setHeureDebut(HeureMinutes heureDebut) {
        this.heureDebut = heureDebut;
    }

    public HeureMinutes getHeureFin() {
        return heureFin;
    }

    public Reservation heureFin(HeureMinutes heureFin) {
        this.heureFin = heureFin;
        return this;
    }

    public void setHeureFin(HeureMinutes heureFin) {
        this.heureFin = heureFin;
    }

    public Integer getNbPersonne() {
        return nbPersonne;
    }

    public Reservation nbPersonne(Integer nbPersonne) {
        this.nbPersonne = nbPersonne;
        return this;
    }

    public void setNbPersonne(Integer nbPersonne) {
        this.nbPersonne = nbPersonne;
    }

    public String getObjet() {
        return objet;
    }

    public Reservation objet(String objet) {
        this.objet = objet;
        return this;
    }

    public void setObjet(String objet) {
        this.objet = objet;
    }

    public String getDescription() {
        return description;
    }

    public Reservation description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Salle> getSalleReservees() {
        return salleReservees;
    }

    public Reservation salleReservees(Set<Salle> salles) {
        this.salleReservees = salles;
        return this;
    }

    public Reservation addSalleReservee(Salle salle) {
        this.salleReservees.add(salle);
        salle.setReservation(this);
        return this;
    }

    public Reservation removeSalleReservee(Salle salle) {
        this.salleReservees.remove(salle);
        salle.setReservation(null);
        return this;
    }

    public void setSalleReservees(Set<Salle> salles) {
        this.salleReservees = salles;
    }

    public Set<Agent> getReserveurs() {
        return reserveurs;
    }

    public Reservation reserveurs(Set<Agent> agents) {
        this.reserveurs = agents;
        return this;
    }

    public Reservation addReserveur(Agent agent) {
        this.reserveurs.add(agent);
        agent.setReservation(this);
        return this;
    }

    public Reservation removeReserveur(Agent agent) {
        this.reserveurs.remove(agent);
        agent.setReservation(null);
        return this;
    }

    public void setReserveurs(Set<Agent> agents) {
        this.reserveurs = agents;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Reservation reservation = (Reservation) o;
        if (reservation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reservation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Reservation{" +
            "id=" + getId() +
            ", jourResa='" + getJourResa() + "'" +
            ", heureDebut='" + getHeureDebut() + "'" +
            ", heureFin='" + getHeureFin() + "'" +
            ", nbPersonne='" + getNbPersonne() + "'" +
            ", objet='" + getObjet() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
