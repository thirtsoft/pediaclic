import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface StatCard {
  id: string;
  value: number;
  label: string;
  trend: string;
  theme: 'mint' | 'blue' | 'green' | 'peach';
  icon: 'users' | 'calendar' | 'stethoscope' | 'bell';
}

export interface Appointment {
  id: string;
  time: string;
  patientName: string;
  age: string;
  reason: string;
  status: 'CONFIRMED' | 'UPCOMING';
  avatarUrl: string;
}

export interface PriorityAlert {
  id: string;
  title: string;
  subtitle: string;
  severity: 'danger' | 'warning' | 'info';
}

export interface QuickAction {
  id: string;
  label: string;
  theme: 'green' | 'blue' | 'purple' | 'orange' | 'teal';
  icon: 'calendar-plus' | 'user-plus' | 'file-medical' | 'syringe' | 'prescription';
}

export interface RecentPatient {
  id: string;
  name: string;
  age: string;
  lastVisit: string;
  status: 'UP_TO_DATE' | 'TO_FOLLOW';
  avatarUrl: string;
}

export interface ActivityDay {
  day: string;
  date: string;
  count: number;
}

@Component({
  selector: 'app-medecin-dashboard',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './medecin-dashboard.component.html',
  styleUrl: './medecin-dashboard.component.scss'
})
export class MedecinDashboardComponent {

  private readonly router = inject(Router);

  readonly isMobileMenuOpen = signal(false);
  readonly activeNav = signal('medecin-dashboard');
  readonly doctorName = signal('Dr. Diallo');
  readonly doctorPhotoUrl = signal('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80');
  readonly childMascotUrl = signal('https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=300&q=80');
  readonly currentDate = signal('Mercredi 19 Novembre 2026');
  readonly notificationCount = signal(3);

  readonly selectedKpiId = signal<string | null>(null);
  readonly selectedCardId = signal<string | null>(null);

  readonly navItems = [
    { id: 'medecin-dashboard', label: 'Tableau de bord1', icon: 'dashboard' },
    { id: 'cabinet-dashboard', label: 'Tableau de bord2', icon: 'dashboard' },
    { id: 'patient', label: 'Patients', icon: 'patients' },
    { id: 'appointments', label: 'Rendez-vous', icon: 'appointments' },
    { id: 'consultations', label: 'Consultations', icon: 'consultations' },
    { id: 'prescriptions', label: 'Ordonnances', icon: 'prescriptions' },
    { id: 'vaccinations', label: 'Vaccinations', icon: 'vaccinations' },
    { id: 'growth', label: 'Suivi croissance', icon: 'growth' },
    { id: 'billing', label: 'Facturation', icon: 'billing' },
    { id: 'reports', label: 'Rapports', icon: 'reports' },
    { id: 'settings', label: 'Paramètres', icon: 'settings' }
  ];

  readonly stats = signal<StatCard[]>([
    { id: 'patients', value: 186, label: 'Patients enregistrés', trend: '+5%', theme: 'mint', icon: 'users' },
    { id: 'rdv', value: 8, label: "Rendez-vous aujourd'hui", trend: '+0%', theme: 'blue', icon: 'calendar' },
    { id: 'consults', value: 6, label: "Consultations aujourd'hui", trend: '+20%', theme: 'green', icon: 'stethoscope' },
    { id: 'followups', value: 12, label: 'Suivis à effectuer', trend: '+2%', theme: 'peach', icon: 'bell' }
  ]);

  readonly appointments = signal<Appointment[]>([
    {
      id: '1',
      time: '08:00',
      patientName: 'Awa Ndiaye',
      age: '3 ans',
      reason: 'Consultation de suivi',
      status: 'CONFIRMED',
      avatarUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: '2',
      time: '08:30',
      patientName: 'Mamadou Fall',
      age: '8 mois',
      reason: 'Suivi croissance',
      status: 'UPCOMING',
      avatarUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: '3',
      time: '09:00',
      patientName: 'Fatou Diop',
      age: '2 ans',
      reason: 'Vaccination',
      status: 'UPCOMING',
      avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: '4',
      time: '09:30',
      patientName: 'Ibrahima Ba',
      age: '5 ans',
      reason: 'Contrôle médical',
      status: 'CONFIRMED',
      avatarUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=150&q=80'
    }
  ]);

  readonly priorityAlerts = signal<PriorityAlert[]>([
    { id: '1', title: '3 contrôles en retard', subtitle: 'Awa Ndiaye, Mamadou Fall, Khady Diallo', severity: 'danger' },
    { id: '2', title: '2 vaccinations à prévoir', subtitle: 'Aliou Sow, Mariama Ba', severity: 'warning' },
    { id: '3', title: '5 suivis cette semaine', subtitle: 'Pour un bon suivi de croissance', severity: 'info' }
  ]);

  readonly quickActions = signal<QuickAction[]>([
    { id: 'new-rdv', label: 'Prendre un RDV', theme: 'green', icon: 'calendar-plus' },
    { id: 'new-patient', label: 'Enregistrer un patient', theme: 'blue', icon: 'user-plus' },
    { id: 'new-consult', label: 'Nouvelle consultation', theme: 'purple', icon: 'file-medical' },
    { id: 'new-vaccine', label: 'Saisir une vaccination', theme: 'orange', icon: 'syringe' },
    { id: 'new-rx', label: 'Éditer une ordonnance', theme: 'teal', icon: 'prescription' }
  ]);

  readonly recentPatients = signal<RecentPatient[]>([
    {
      id: '1',
      name: 'Awa Ndiaye',
      age: '3 ans',
      lastVisit: "Dernière visite : aujourd'hui",
      status: 'UP_TO_DATE',
      avatarUrl: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: '2',
      name: 'Mamadou Fall',
      age: '8 mois',
      lastVisit: 'Dernière visite : 10/11/2026',
      status: 'TO_FOLLOW',
      avatarUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: '3',
      name: 'Fatou Diop',
      age: '2 ans',
      lastVisit: 'Dernière visite : 08/11/2026',
      status: 'UP_TO_DATE',
      avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80'
    }
  ]);

  readonly weeklyActivity = signal<ActivityDay[]>([
    { day: 'Lun', date: '13/11', count: 4 },
    { day: 'Mar', date: '14/11', count: 5 },
    { day: 'Mer', date: '15/11', count: 6 },
    { day: 'Jeu', date: '16/11', count: 7 },
    { day: 'Ven', date: '17/11', count: 6 },
    { day: 'Sam', date: '18/11', count: 5 },
    { day: 'Dim', date: '19/11', count: 6 }
  ]);

  readonly maxActivityCount = 8;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  selectNav(id: string): void {
    this.activeNav.set(id);
    this.isMobileMenuOpen.set(false);

    this.router.navigate(['/', id]).then(
      success => {
        console.log('Navigation vers', id, success);
      },
      error => {
        console.error('Erreur de navigation vers', id, error);
      }
    );
  }

  triggerAction(actionId: string): void {
    console.log('Action déclenchée :', actionId);
  }

  toggleKpiSelection(id: string): void {
    this.selectedKpiId.update(curr => curr === id ? null : id);
  }

  toggleCardSelection(id: string): void {
    this.selectedCardId.update(curr => curr === id ? null : id);
  }
}