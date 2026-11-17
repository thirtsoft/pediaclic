import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface Appointment {
  time: string;
  name: string;
  age: string;
  type: string;
  status: 'Confirmé' | 'À venir';
  avatarColor: string;
}

interface PriorityAlert {
  type: 'danger' | 'warning' | 'info';
  title: string;
  subtitle: string;
}

interface RecentPatient {
  name: string;
  age: string;
  lastVisit: string;
  status: 'Suivi à jour' | 'À suivre';
  avatarColor: string;
}

@Component({
  selector: 'app-tableau-medecin.component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tableau-medecin.component.html',
  styleUrl: './tableau-medecin.component.scss',
})
export class TableauMedecinComponent {

  // Date actuelle statique pour correspondre à l'image
  currentDate = 'Mercredi 19 Novembre 2026';

  // Données statiques : Rendez-vous
  appointments = signal<Appointment[]>([
    { time: '08:00', name: 'Awa Ndiaye', age: '3 ans', type: 'Consultation de suivi', status: 'Confirmé', avatarColor: '#FDE68A' },
    { time: '08:30', name: 'Mamadou Fall', age: '8 mois', type: 'Suivi croissance', status: 'À venir', avatarColor: '#BFDBFE' },
    { time: '09:00', name: 'Fatou Diop', age: '2 ans', type: 'Vaccination', status: 'À venir', avatarColor: '#FBCFE8' },
    { time: '09:30', name: 'Ibrahima Ba', age: '5 ans', type: 'Contrôle médical', status: 'Confirmé', avatarColor: '#A7F3D0' }
  ]);

  // Données statiques : Alertes prioritaires
  priorityAlerts = signal<PriorityAlert[]>([
    { type: 'danger', title: '3 contrôles en retard', subtitle: 'Awa Ndiaye, Mamadou Fall, Khady Diallo' },
    { type: 'warning', title: '2 vaccinations à prévoir', subtitle: 'Aliou Sow, Mariama Ba' },
    { type: 'info', title: '5 suivis cette semaine', subtitle: 'Pour un bon suivi de croissance' }
  ]);

  // Données statiques : Patients récents
  recentPatients = signal<RecentPatient[]>([
    { name: 'Awa Ndiaye', age: '3 ans', lastVisit: "aujourd'hui", status: 'Suivi à jour', avatarColor: '#FDE68A' },
    { name: 'Mamadou Fall', age: '8 mois', lastVisit: '10/11/2026', status: 'À suivre', avatarColor: '#BFDBFE' },
    { name: 'Fatou Diop', age: '2 ans', lastVisit: '08/11/2026', status: 'Suivi à jour', avatarColor: '#FBCFE8' }
  ]);

  // Données statiques : Graphique d'activité (7 derniers jours)
  chartData = signal([
    { day: 'Lun', date: '13/11', value: 4, height: '40%' },
    { day: 'Mar', date: '14/11', value: 5, height: '55%' },
    { day: 'Mer', date: '15/11', value: 6, height: '65%' },
    { day: 'Jeu', date: '16/11', value: 7, height: '80%' },
    { day: 'Ven', date: '17/11', value: 6, height: '65%' },
    { day: 'Sam', date: '18/11', value: 5, height: '55%' },
    { day: 'Dim', date: '19/11', value: 6, height: '65%' }
  ]);
}
