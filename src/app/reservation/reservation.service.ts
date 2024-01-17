import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];
  private apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {

  }

  // CRUD

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + '/reservations');
  }

  getReservation(id: string): Observable<Reservation> | undefined {
    return this.http.get<Reservation>(this.apiUrl + '/reservations/' + id);

  }

  addReservation(reservation: Reservation): void {

    reservation.id = Date.now().toString();

    this.http.post(this.apiUrl + '/reservations', reservation).subscribe(err => {
      console.log(err);
    });
  }

  deleteReservation(id: string): Observable<Reservation> {
    return this.http.delete<Reservation>(this.apiUrl + '/reservations/' + id);

  }

  updateReservation(id: string, updatedReservation: Reservation): Observable<void> {
    console.log(this.apiUrl + "/reservations/" + id);

    return this.http.put<void>(this.apiUrl + "/reservations/" + id, updatedReservation);
  }

}
