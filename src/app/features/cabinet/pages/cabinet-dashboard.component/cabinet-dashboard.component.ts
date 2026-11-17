import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
interface NavItem {
  id: string,
  label: string;
  icon: string;
  active: boolean;
}

interface StatCard {
  id: string;
  value: string;
  currency?: string;
  label: string;
  trend: string;
  theme: 'teal' | 'blue' | 'green' | 'orange';
  icon: string;
}

interface Doctor {
  name: string;
  specialty: string;
  appointments: number;
  avatar: string;
}

interface QuickAction {
  label: string;
  icon: string;
  theme: 'blue' | 'green' | 'light-blue' | 'orange';
}

interface AlertItem {
  title: string;
  theme: 'red' | 'orange' | 'blue';
  icon: string;
}


@Component({
  selector: 'app-cabinet-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cabinet-dashboard.component.html',
  styleUrl: './cabinet-dashboard.component.scss'
})
export class CabinetDashboardComponent {

    private readonly router = inject(Router);

  selectedPeriod: 'today' | '7days' | 'month' = 'today';
  selectedKpiId: string | null = null;
  selectedCardId: string | null = null;

  navItems: NavItem[] = [
    { id: 'cabinet-dashboard', label: 'Tableau de bord', icon: 'fa-solid fa-table-cells-large', active: true },
    { id: 'medecin-dashboard', label: 'Tableau de bord2', icon: 'fa-solid fa-table-cells-large', active: false },
    { id: 'patients', label: 'Patients', icon: 'fa-solid fa-user-group', active: false },
    { id: 'appointments', label: 'Rendez-vous', icon: 'fa-regular fa-calendar', active: false },
    { id: 'consultations', label: 'Consultations', icon: 'fa-solid fa-stethoscope', active: false },
    { id: 'prescriptions', label: 'Médecins', icon: 'fa-solid fa-user-doctor', active: false },
    {id: 'vaccinations',  label: 'Secrétariat', icon: 'fa-solid fa-users', active: false },
    { id: 'growth', label: 'Facturation', icon: 'fa-solid fa-file-invoice-dollar', active: false },
    { id: 'reports', label: 'Rapports', icon: 'fa-solid fa-chart-column', active: false },
    {id: 'settings', label: 'Paramètres', icon: 'fa-solid fa-gear', active: false }
  ];

  kpiCards: StatCard[] = [
    {
      id: 'patients',
      value: '842',
      label: 'Patients enregistrés',
      trend: '+6%',
      theme: 'teal',
      icon: 'fa-solid fa-user-group'
    },
    {
      id: 'rdv',
      value: '31',
      label: "Rendez-vous aujourd'hui",
      trend: '+8%',
      theme: 'blue',
      icon: 'fa-solid fa-calendar-days'
    },
    {
      id: 'consultations',
      value: '26',
      label: "Consultations aujourd'hui",
      trend: '+12%',
      theme: 'green',
      icon: 'fa-solid fa-stethoscope'
    },
    {
      id: 'recettes',
      value: '2 980 000',
      currency: 'FCFA',
      label: 'Recettes du mois',
      trend: '+10%',
      theme: 'orange',
      icon: 'fa-solid fa-coins'
    }
  ];

  doctors: Doctor[] = [
    {
      name: 'Dr. Diallo',
      specialty: 'Pédiatre',
      appointments: 8,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Dr. Ndiaye',
      specialty: 'Pédiatre',
      appointments: 6,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Dr. Fall',
      specialty: 'Pédiatre',
      appointments: 5,
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=150&q=80'
    }
  ];

  quickActions: QuickAction[] = [
    { label: 'Prendre un RDV', icon: 'fa-solid fa-calendar-plus', theme: 'blue' },
    { label: 'Enregistrer un patient', icon: 'fa-solid fa-user-plus', theme: 'green' },
    { label: 'Nouvelle consultation', icon: 'fa-solid fa-stethoscope', theme: 'light-blue' },
    { label: 'Éditer une facture', icon: 'fa-solid fa-file-invoice', theme: 'orange' }
  ];

  alerts: AlertItem[] = [
    { title: '3 contrôles en retard', theme: 'red', icon: 'fa-solid fa-exclamation' },
    { title: '5 vaccinations à prévoir', theme: 'orange', icon: 'fa-solid fa-syringe' },
    { title: '2 suivis croissance cette semaine', theme: 'blue', icon: 'fa-solid fa-arrow-trend-up' }
  ];

  chartDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Sam', 'Dim'];
  rdvPoints = [
    { x: 20, y: 62 }, { x: 72, y: 38 }, { x: 124, y: 38 },
    { x: 176, y: 33 }, { x: 228, y: 38 }, { x: 280, y: 22 }
  ];
  consultPoints = [
    { x: 20, y: 82 }, { x: 72, y: 60 }, { x: 124, y: 58 },
    { x: 176, y: 53 }, { x: 228, y: 60 }, { x: 280, y: 45 }
  ];

  getPolylinePoints(points: { x: number; y: number }[]): string {
    return points.map(p => `${p.x},${p.y}`).join(' ');
  }

  selectNav(selectedItem: NavItem): void {
    this.navItems.forEach(item => (item.active = false));
    selectedItem.active = true;
    void this.router.navigate([selectedItem.id]);
  }

  setPeriod(period: 'today' | '7days' | 'month'): void {
    this.selectedPeriod = period;
  }

  toggleKpiSelection(id: string): void {
    this.selectedKpiId = this.selectedKpiId === id ? null : id;
  }

  toggleCardSelection(id: string): void {
    this.selectedCardId = this.selectedCardId === id ? null : id;
  }
}