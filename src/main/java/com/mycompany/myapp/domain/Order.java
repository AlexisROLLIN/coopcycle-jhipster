package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

import com.mycompany.myapp.domain.enumeration.OrderState;

/**
 * The Order entity.
 */
@ApiModel(description = "The Order entity.")
@Entity
@Table(name = "jhi_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "order_state", nullable = false)
    private OrderState orderState;

    @NotNull
    @Column(name = "delivery_time", nullable = false)
    private Instant deliveryTime;

    @ManyToOne
    @JsonIgnoreProperties("orders")
    private Restaurant restaurant;

    @ManyToOne
    @JsonIgnoreProperties("orders")
    private User user;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("orders")
    private Payment payment;

    @OneToOne(mappedBy = "order")
    @JsonIgnore
    private Basket basket;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrderState getOrderState() {
        return orderState;
    }

    public Order orderState(OrderState orderState) {
        this.orderState = orderState;
        return this;
    }

    public void setOrderState(OrderState orderState) {
        this.orderState = orderState;
    }

    public Instant getDeliveryTime() {
        return deliveryTime;
    }

    public Order deliveryTime(Instant deliveryTime) {
        this.deliveryTime = deliveryTime;
        return this;
    }

    public void setDeliveryTime(Instant deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public Order restaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
        return this;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public User getUser() {
        return user;
    }

    public Order user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Payment getPayment() {
        return payment;
    }

    public Order payment(Payment payment) {
        this.payment = payment;
        return this;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public Basket getBasket() {
        return basket;
    }

    public Order basket(Basket basket) {
        this.basket = basket;
        return this;
    }

    public void setBasket(Basket basket) {
        this.basket = basket;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return id != null && id.equals(((Order) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", orderState='" + getOrderState() + "'" +
            ", deliveryTime='" + getDeliveryTime() + "'" +
            "}";
    }
}
