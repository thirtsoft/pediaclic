import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-patient-component',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './patient-component.html',
  styleUrl: './patient-component.css',
})
export class PatientComponent {
  
}
