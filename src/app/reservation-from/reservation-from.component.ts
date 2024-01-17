import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../reservation/models/reservation';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reservation-from',
  templateUrl: './reservation-from.component.html',
  styleUrls: ['./reservation-from.component.css'],
})
export class ReservationFromComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});
  id = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', [Validators.required]],
    });

    if (this.id) {
      let reservation = this.reservationService.getReservation(this.id);
      if (reservation) {
        this.reservationForm.patchValue(reservation);
      }
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;
      // Update or Add reservation based on Edit mode
      if (this.id) {
        reservation.id = this.id;
        this.reservationService.updateReservation(reservation);
      } else {
        this.reservationService.addReservation(reservation);
      }
      // Navigating to List Url
      this.router.navigate(['/list']);
    } else {
      console.error(this.reservationForm.errors);
    }
  }
}
