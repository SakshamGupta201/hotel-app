import { Injectable, OnInit } from '@angular/core';
import { Reservation } from './models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor() {
    let storedReservations = localStorage.getItem('reservations');
    if (storedReservations) {
      this.reservations = JSON.parse(storedReservations);
    }
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: number): Reservation | undefined {
    return this.reservations.find(res => res.id === id);
  }

  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
    this.updateLocalStorage();
  }

  deleteReservation(id: number): void {
    const index = this.reservations.findIndex(res => res.id === id);
    if (index !== -1) {
      this.reservations.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  updateReservation(updatedReservation: Reservation): void {
    const index = this.reservations.findIndex(res => res.id === updatedReservation.id);
    if (index !== -1) {
      this.reservations[index] = updatedReservation;
      this.updateLocalStorage();
    }
  }

  updateLocalStorage(): void {
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
